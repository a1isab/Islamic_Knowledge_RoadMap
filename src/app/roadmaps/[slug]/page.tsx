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
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  BookOpenText,
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  BookMarked,
  Bookmark,
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
  const [sheetOpen, setSheetOpen] = useState(false)
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
        setSheetOpen(true)
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

  const handleToggleComplete = async () => {
    if (!selectedNode || !user) return

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
      newStatus === "completed" ? "Node completed! 🎉" : "Node marked in progress"
    )
  }

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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selectedNode && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={difficultyColor[selectedNode.difficulty]}
                  >
                    {selectedNode.difficulty}
                  </Badge>
                  <Badge variant="outline">Stage {selectedNode.stage}</Badge>
                </div>
                <SheetTitle className="mt-2 text-xl">
                  {selectedNode.title}
                </SheetTitle>
                <SheetDescription>
                  {selectedNode.description}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Estimated time: {selectedNode.estimatedHours} hours
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3 font-semibold flex items-center gap-2">
                    <BookOpenText className="h-4 w-4" />
                    Resources
                  </h4>
                  <div className="space-y-3">
                    {selectedNode.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">
                              {resource.title}
                            </p>
                            {resource.author && (
                              <p className="text-xs text-muted-foreground">
                                by {resource.author}
                              </p>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        {resource.description && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {resource.description}
                          </p>
                        )}
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex text-xs font-medium text-primary hover:underline"
                          >
                            View resource
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

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
                      !isNodeAvailable(selectedNode) &&
                      getNodeStatus(selectedNode.id)?.status !== "completed"
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
                          ? "Mark Complete"
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
        </SheetContent>
      </Sheet>
    </>
  )
}
