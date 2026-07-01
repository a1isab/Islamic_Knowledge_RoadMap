"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

export default function EditRoadmapPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()
  const [roadmap, setRoadmap] = useState<any>(null)
  const [nodes, setNodes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [nodeTitle, setNodeTitle] = useState("")
  const [nodeDescription, setNodeDescription] = useState("")
  const [nodeDifficulty, setNodeDifficulty] = useState("beginner")
  const [nodeHours, setNodeHours] = useState("")
  const [nodeStage, setNodeStage] = useState("1")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: r } = await supabase.from("roadmaps").select("*").eq("id", id).single()
    const rData = r as Record<string, unknown> | null
    if (rData) setRoadmap(rData)

    const { data: n } = await supabase
      .from("nodes")
      .select("*")
      .eq("roadmap_id", id)
      .order("sort_order")

    if (n) setNodes(n)
    setLoading(false)
  }

  const handleAddNode = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from("nodes").insert({
      roadmap_id: id,
      title: nodeTitle,
      description: nodeDescription,
      difficulty: nodeDifficulty,
      estimated_hours: nodeHours ? parseFloat(nodeHours) : null,
      stage: parseInt(nodeStage),
      sort_order: nodes.length + 1,
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Node added")
    setOpen(false)
    setNodeTitle("")
    setNodeDescription("")
    setNodeHours("")
    fetchData()
  }

  const handleDeleteNode = async (nodeId: string) => {
    if (!confirm("Delete this node and its resources?")) return

    const { error } = await supabase.from("nodes").delete().eq("id", nodeId)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Node deleted")
    fetchData()
  }

  if (loading) {
    return <Skeleton className="h-96" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/roadmaps")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{(roadmap as Record<string, unknown>)?.title as string}</h1>
          <p className="text-muted-foreground">Manage nodes and resources for this roadmap.</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Nodes ({nodes.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Node
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Node</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNode} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={nodeTitle} onChange={(e) => setNodeTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={nodeDescription}
                  onChange={(e) => setNodeDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <select
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    value={nodeDifficulty}
                    onChange={(e) => setNodeDifficulty(e.target.value)}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Hours</Label>
                  <Input type="number" value={nodeHours} onChange={(e) => setNodeHours(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Stage</Label>
                  <Input type="number" value={nodeStage} onChange={(e) => setNodeStage(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full">Add Node</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {nodes.map((node) => (
          <Card key={node.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{node.title}</span>
                  <Badge variant="secondary" className="text-xs">
                    Stage {node.stage}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {node.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {node.estimated_hours ? `${node.estimated_hours}h` : "No time set"}
                  {node.description ? ` — ${node.description.slice(0, 100)}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Link href={`/roadmaps/${(roadmap as Record<string, unknown>)?.slug}/${node.id}`}>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <ExternalLink className="h-3 w-3" /> View
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteNode(node.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {nodes.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">No nodes yet. Add your first node.</p>
        )}
      </div>
    </div>
  )
}
