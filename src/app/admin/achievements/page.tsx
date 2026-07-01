"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Plus, Pencil, Trash2, Users } from "lucide-react"
import { toast } from "sonner"

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("trophy")
  const [criteriaType, setCriteriaType] = useState("complete_roadmap")
  const [criteriaCount, setCriteriaCount] = useState("1")
  const supabase = createClient()

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    const { data } = await supabase.from("achievements").select("*")
    if (data) setAchievements(data)
    setLoading(false)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from("achievements").insert({
      slug,
      title,
      description,
      icon,
      criteria: { type: criteriaType, count: parseInt(criteriaCount) },
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Achievement created")
    setOpen(false)
    setTitle("")
    setSlug("")
    setDescription("")
    fetchAchievements()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this achievement?")) return

    const { error } = await supabase.from("achievements").delete().eq("id", id)
    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Achievement deleted")
    fetchAchievements()
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">{achievements.length} achievements defined.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Achievement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Achievement</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="e.g. the-beginner" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  className="min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g. trophy, flame, users" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Criteria Type</Label>
                  <select
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    value={criteriaType}
                    onChange={(e) => setCriteriaType(e.target.value)}
                  >
                    <option value="complete_roadmap">Complete Roadmap</option>
                    <option value="streak">Study Streak</option>
                    <option value="complete_books">Complete Books</option>
                    <option value="join_groups">Join Groups</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Count</Label>
                  <Input type="number" value={criteriaCount} onChange={(e) => setCriteriaCount(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{a.title}</span>
                    <Badge variant="secondary" className="text-xs">{a.slug}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Criteria: {a.criteria?.type} ({a.criteria?.count})
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
