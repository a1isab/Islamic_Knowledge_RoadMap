"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState, useCallback } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  MarkerType,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  BookOpenText,
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  Bookmark,
  HelpCircle,
  XCircle,
  Award,
} from "lucide-react"
import { getRoadmapBySlug, getNodeById } from "@/data/arabic-roadmap"
import type {
  RoadmapNode,
  UserProgress,
  Roadmap,
} from "@/types/roadmap"
import { toast } from "sonner"

const difficultyColor = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
}

function buildFlowData(
  roadmap: Roadmap,
  progress: UserProgress[]
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = roadmap.nodes.map((n) => {
    const userNode = progress.find((p) => p.nodeId === n.id)
    const status = userNode?.status || "locked"

    const isLocked = status === "locked"
    const isCompleted = status === "completed"

    return {
      id: n.id,
      type: "default",
      position: n.position,
      data: {
        label: n.title,
        difficulty: n.difficulty,
        stage: n.stage,
        isLocked,
        isCompleted,
        estimatedHours: n.estimatedHours,
      },
      style: {
        background: isCompleted
          ? "hsl(142, 71%, 45%)"
          : isLocked
          ? "hsl(0, 0%, 96%)"
          : "white",
        color: isLocked ? "hsl(0, 0%, 60%)" : isCompleted ? "white" : "inherit",
        border: `2px solid ${
          isCompleted
            ? "hsl(142, 71%, 45%)"
            : isLocked
            ? "hsl(0, 0%, 85%)"
            : "hsl(142, 71%, 45%)"
        }`,
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: 500,
        width: 200,
        opacity: isLocked ? 0.6 : 1,
        cursor: "pointer",
      },
    }
  })

  const edges: Edge[] = roadmap.nodes.flatMap((n) =>
    n.prerequisites.map((prereq) => {
      const prereqProgress = progress.find((p) => p.nodeId === prereq.nodeId)
      const prereqCompleted = prereqProgress?.status === "completed"

      return {
        id: `${prereq.nodeId}-${n.id}`,
        source: prereq.nodeId,
        target: n.id,
        type: "smoothstep",
        animated: prereqCompleted,
        style: {
          stroke: prereqCompleted ? "hsl(142, 71%, 45%)" : "hsl(0, 0%, 80%)",
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: prereqCompleted ? "hsl(142, 71%, 45%)" : "hsl(0, 0%, 80%)",
        },
      }
    })
  )

  return { nodes, edges }
}

export default function RoadmapDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null)
  const [nodeDialogOpen, setNodeDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const roadmap = useMemo(() => getRoadmapBySlug(slug), [slug])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (!data.user) {
        router.push("/login")
        return
      }
    })
  }, [])

  useEffect(() => {
    if (!user) return

    const fetchProgress = async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)

      if (data) {
        setProgress(data as UserProgress[])
      }
      setLoading(false)
    }

    fetchProgress()
  }, [user])

  const { nodes: initialNodes, edges: initialEdges } = roadmap
    ? buildFlowData(roadmap, progress)
    : { nodes: [], edges: [] }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    if (roadmap) {
      const { nodes: newNodes, edges: newEdges } = buildFlowData(
        roadmap,
        progress
      )
      setNodes(newNodes)
      setEdges(newEdges)
    }
  }, [progress, roadmap])

  const onNodeClick = useCallback(
    (_: any, node: Node) => {
      const roadmapNode = roadmap?.nodes.find((n) => n.id === node.id)
      if (roadmapNode) {
        setSelectedNode(roadmapNode)
        setNodeDialogOpen(true)
      }
    },
    [roadmap]
  )

  const getNodeStatus = (nodeId: string): UserProgress | undefined => {
    return progress.find((p) => p.nodeId === nodeId)
  }

  const isNodeAvailable = (node: RoadmapNode): boolean => {
    const userNode = progress.find((p) => p.nodeId === node.id)
    if (userNode?.status === "completed") return false

    return node.prerequisites.every((prereq) => {
      const prereqProgress = progress.find(
        (p) => p.nodeId === prereq.nodeId
      )
      return prereqProgress?.status === "completed"
    })
  }

  const openQuiz = () => {
    if (!selectedNode?.quiz) return
    setQuizAnswers(new Array(selectedNode.quiz.questions.length).fill(-1))
    setQuizSubmitted(false)
    setQuizScore(0)
    setQuizPassed(false)
    setQuizOpen(true)
  }

  const submitQuiz = () => {
    if (!selectedNode?.quiz) return
    const correct = selectedNode.quiz.questions.reduce((count, q, i) => {
      return count + (quizAnswers[i] === q.correctIndex ? 1 : 0)
    }, 0)
    setQuizScore(correct)
    setQuizSubmitted(true)
    if (correct >= selectedNode.quiz.passingScore) {
      setQuizPassed(true)
      toast.success(`You passed! ${correct}/${selectedNode.quiz.questions.length}`)
    } else {
      toast.error(`You got ${correct}/${selectedNode.quiz.questions.length}. Try again.`)
    }
  }

  const handleToggleComplete = async () => {
    if (!selectedNode || !user) return

    if (selectedNode.quiz && !quizPassed) {
      openQuiz()
      return
    }

    const currentStatus = getNodeStatus(selectedNode.id)?.status
    const newStatus = currentStatus === "completed" ? "in_progress" : "completed"

    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: user.id,
        node_id: selectedNode.id,
        status: newStatus,
        completed_at: newStatus === "completed" ? new Date().toISOString() : null,
      },
      { onConflict: "user_id, node_id" }
    )

    if (error) {
      toast.error("Failed to update progress")
      return
    }

    setProgress((prev) => {
      const existing = prev.find((p) => p.nodeId === selectedNode.id)
      if (existing) {
        return prev.map((p) =>
          p.nodeId === selectedNode.id
            ? { ...p, status: newStatus, completed_at: newStatus === "completed" ? new Date().toISOString() : null }
            : p
        )
      }
      return [
        ...prev,
        {
          nodeId: selectedNode.id,
          status: newStatus as UserProgress["status"],
          completed_at: newStatus === "completed" ? new Date().toISOString() : undefined,
        },
      ]
    })

    toast.success(
      newStatus === "completed" ? "Node completed!" : "Node marked in progress"
    )
  }

  const [quizOpen, setQuizOpen] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizPassed, setQuizPassed] = useState(false)
  const completedNodes = progress.filter((p) => p.status === "completed").length
  const totalNodes = roadmap?.nodes.length || 0
  const completionPercent = totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-8 h-[600px] animate-pulse rounded-xl bg-muted" />
        </div>
      </>
    )
  }

  if (!roadmap) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-w-5xl px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Roadmap not found</h1>
          <p className="text-muted-foreground">
            The roadmap you&apos;re looking for doesn&apos;t exist yet.
          </p>
          <Button className="mt-4" onClick={() => router.push("/roadmaps")}>
            Browse Roadmaps
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="border-b px-4 py-4">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/roadmaps")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    {roadmap.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {roadmap.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {completedNodes}/{totalNodes} completed
                  </p>
                  <Progress value={completionPercent} className="mt-1 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-12rem)] w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            attributionPosition="bottom-left"
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            <Controls />
            <MiniMap
              nodeStrokeWidth={3}
              zoomable
              pannable
              style={{ borderRadius: "8px" }}
            />
          </ReactFlow>
        </div>
      </main>

      <Dialog open={nodeDialogOpen} onOpenChange={setNodeDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" showCloseButton>
          {selectedNode && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={difficultyColor[selectedNode.difficulty]}
                  >
                    {selectedNode.difficulty}
                  </Badge>
                  <Badge variant="outline">Stage {selectedNode.stage}</Badge>
                </div>
                <DialogTitle className="mt-2 text-xl">
                  {selectedNode.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedNode.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Estimated time: {selectedNode.estimatedHours} hours
                </div>

                <Separator />

                {selectedNode.resources.filter((r) => r.type === "guide" && r.content).length > 0 && (
                  <div>
                    <h4 className="mb-3 font-semibold flex items-center gap-2">
                      <BookOpenText className="h-4 w-4" />
                      Study Guide
                    </h4>
                    <div className="space-y-6">
                      {selectedNode.resources
                        .filter((r) => r.type === "guide" && r.content)
                        .map((resource) => (
                          <div
                            key={resource.id}
                            className="rounded-lg border p-5"
                          >
                            <div className="markdown text-sm leading-relaxed space-y-3">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  h2: ({ children }) => (
                                    <h3 className="text-base font-semibold mt-5 mb-2">
                                      {children}
                                    </h3>
                                  ),
                                  h3: ({ children }) => (
                                    <h4 className="text-sm font-semibold mt-4 mb-1">
                                      {children}
                                    </h4>
                                  ),
                                  ul: ({ children }) => (
                                    <ul className="list-disc pl-5 space-y-1">
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className="list-decimal pl-5 space-y-1">
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children }) => <li>{children}</li>,
                                  p: ({ children }) => (
                                    <p className="mb-1">{children}</p>
                                  ),
                                  strong: ({ children }) => (
                                    <strong className="font-semibold">
                                      {children}
                                    </strong>
                                  ),
                                  code: ({ children }) => (
                                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                                      {children}
                                    </code>
                                  ),
                                  hr: () => <hr className="my-4 border-border" />,
                                }}
                              >
                                {resource.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <Separator />

                {selectedNode.prerequisites.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      Prerequisites
                    </h4>
                    <div className="space-y-2">
                      {selectedNode.prerequisites.map((prereq) => {
                        const prereqNode = getNodeById(prereq.nodeId)
                        const prereqProgress = getNodeStatus(prereq.nodeId)
                        const isCompleted =
                          prereqProgress?.status === "completed"
                        return (
                          <div
                            key={prereq.nodeId}
                            className="flex items-center gap-2 text-sm"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span
                              className={
                                isCompleted
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-muted-foreground"
                              }
                            >
                              {prereqNode?.title || prereq.nodeId}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <Separator />

                {selectedNode.quiz && (
                  <div>
                    <h4 className="mb-3 font-semibold flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Knowledge Check
                    </h4>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      {quizPassed ? (
                        <div className="flex flex-col items-center gap-2 py-2 text-center">
                          <Award className="h-8 w-8 text-green-500" />
                          <p className="font-medium text-green-600 dark:text-green-400">
                            Quiz passed! {quizScore}/{selectedNode.quiz.questions.length}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            You can now mark this node as complete.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Pass the quiz ({selectedNode.quiz.passingScore}/{selectedNode.quiz.questions.length} correct) to unlock completion.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-2"
                            onClick={openQuiz}
                          >
                            <HelpCircle className="h-4 w-4" /> Start Quiz
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex gap-3">
                  <Button
                    className="flex-1 gap-2"
                    variant={
                      getNodeStatus(selectedNode.id)?.status === "completed"
                        ? "outline"
                        : "default"
                    }
                    onClick={handleToggleComplete}
                    disabled={
                      (!isNodeAvailable(selectedNode) &&
                        getNodeStatus(selectedNode.id)?.status !== "completed") ||
                      (selectedNode.quiz && !quizPassed && getNodeStatus(selectedNode.id)?.status !== "completed")
                    }
                  >
                    {getNodeStatus(selectedNode.id)?.status === "completed" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Completed
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4" />{" "}
                        {isNodeAvailable(selectedNode)
                          ? selectedNode.quiz && !quizPassed
                            ? "Pass quiz to complete"
                            : "Mark Complete"
                          : "Complete prerequisites first"}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={quizOpen} onOpenChange={(open) => { if (!open && !quizPassed) { setQuizOpen(false) } }}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedNode?.quiz && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Knowledge Check
                </DialogTitle>
                <DialogDescription>
                  Answer all questions correctly to pass (passing: {selectedNode.quiz.passingScore}/{selectedNode.quiz.questions.length}).
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {selectedNode.quiz.questions.map((q, qi) => (
                  <div key={qi} className="space-y-3">
                    <p className="font-medium text-sm">
                      {qi + 1}. {q.question}
                    </p>
                    <RadioGroup
                      value={quizAnswers[qi]?.toString() ?? ""}
                      onValueChange={(v) => {
                        const next = [...quizAnswers]
                        next[qi] = parseInt(v)
                        setQuizAnswers(next)
                      }}
                      disabled={quizSubmitted}
                    >
                      {q.options.map((opt, oi) => {
                        let className = "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                        if (quizSubmitted) {
                          if (oi === q.correctIndex) className += " border-green-500 bg-green-50 dark:bg-green-950"
                          else if (oi === quizAnswers[qi] && oi !== q.correctIndex) className += " border-red-500 bg-red-50 dark:bg-red-950"
                        }
                        return (
                          <div key={oi} className={className}>
                            <RadioGroupItem value={oi.toString()} id={`q${qi}-o${oi}`} />
                            <Label htmlFor={`q${qi}-o${oi}`} className="flex-1 cursor-pointer">{opt}</Label>
                            {quizSubmitted && oi === q.correctIndex && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />}
                            {quizSubmitted && oi === quizAnswers[qi] && oi !== q.correctIndex && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                          </div>
                        )
                      })}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {quizSubmitted ? (
                <div className="space-y-3">
                  <div className={`flex items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium ${quizPassed ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                    {quizPassed ? (
                      <><Award className="h-5 w-5" /> Passed! {quizScore}/{selectedNode.quiz.questions.length}</>
                    ) : (
                      <><XCircle className="h-5 w-5" /> {quizScore}/{selectedNode.quiz.questions.length} — try again</>
                    )}
                  </div>
                  {quizPassed ? (
                    <Button className="w-full gap-2" onClick={() => { setQuizOpen(false) }}>
                      <CheckCircle2 className="h-4 w-4" /> Continue
                    </Button>
                  ) : (
                    <Button className="w-full gap-2" variant="outline" onClick={() => {
                      if (selectedNode?.quiz) {
                        setQuizAnswers(new Array(selectedNode.quiz.questions.length).fill(-1))
                      }
                      setQuizSubmitted(false)
                      setQuizScore(0)
                    }}>
                      <HelpCircle className="h-4 w-4" /> Retry Quiz
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  className="w-full gap-2"
                  onClick={submitQuiz}
                  disabled={quizAnswers.some((a) => a === -1)}
                >
                  <CheckCircle2 className="h-4 w-4" /> Submit Answers
                </Button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
