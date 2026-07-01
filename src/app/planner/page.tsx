"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Circle,
  Lightbulb,
  Save,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { toast } from "sonner"

interface PlannerDay {
  day: string
  duration: number
  tasks: string[]
}

interface WeekPlan {
  days: PlannerDay[]
  tips: string[]
}

export default function PlannerPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [dailyMinutes, setDailyMinutes] = useState("30")
  const [plan, setPlan] = useState<WeekPlan | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [showTips, setShowTips] = useState(true)
  const [plans, setPlans] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login")
        return
      }
      setUser(data.user)

      const { data: profile } = await supabase
        .from("profiles")
        .select("study_minutes_daily")
        .eq("id", data.user.id)
        .single()

      const profileData = profile as { study_minutes_daily: number } | null

      if (profileData?.study_minutes_daily) {
        setDailyMinutes(String(profileData.study_minutes_daily))
      }

      const { data: userPlans } = await supabase
        .from("study_plans")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false })

      if (userPlans) setPlans(userPlans)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(`planner-${dailyMinutes}-tasks`)
    if (saved) {
      setCompletedTasks(new Set(JSON.parse(saved)))
    } else {
      setCompletedTasks(new Set())
    }
  }, [dailyMinutes, plan])

  const toggleTask = useCallback((taskKey: string) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev)
      if (next.has(taskKey)) {
        next.delete(taskKey)
      } else {
        next.add(taskKey)
      }
      localStorage.setItem(`planner-${dailyMinutes}-tasks`, JSON.stringify([...next]))
      return next
    })
  }, [dailyMinutes])

  const totalTasks = plan?.days.reduce((sum, d) => sum + d.tasks.length, 0) || 0
  const doneTasks = plan?.days.reduce(
    (sum, d) => sum + d.tasks.filter((_, i) => completedTasks.has(`${d.day}-${i}`)).length,
    0
  ) || 0
  const progressPercent = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0
  const totalMinutes = plan?.days.reduce((sum, d) => sum + d.duration, 0) || 0

  const handleGenerate = async () => {
    setGenerating(true)
    setPlan(null)

    try {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyMinutes: parseInt(dailyMinutes) }),
      })

      if (!response.ok) throw new Error("Failed to generate plan")

      const data = await response.json()
      setPlan(data.schedule)
      toast.success("Study plan generated!")
    } catch {
      toast.error("Could not generate plan.")
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!user || !plan) return
    setSaving(true)

    const { error } = await supabase.from("study_plans").insert({
      user_id: user.id,
      title: `${dailyMinutes} min/day plan`,
      weekly_schedule: plan.days,
      is_ai_generated: true,
    })

    if (error) {
      toast.error("Failed to save plan")
      setSaving(false)
      return
    }

    toast.success("Plan saved!")
    setSaving(false)

    const { data: userPlans } = await supabase
      .from("study_plans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (userPlans) setPlans(userPlans)
  }

  const handleDeletePlan = async (planId: string) => {
    if (!confirm("Delete this plan?")) return

    const { error } = await supabase.from("study_plans").delete().eq("id", planId)
    if (error) {
      toast.error("Failed to delete plan")
      return
    }

    toast.success("Plan deleted")
    setPlans((prev) => prev.filter((p) => p.id !== planId))
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Skeleton className="mb-8 h-8 w-48" />
          <Skeleton className="h-64" />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Study Planner
              </h1>
              <p className="text-muted-foreground">
                Plan your weekly Islamic studies.
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Your Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailyMinutes">
                Minutes available per day
              </Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="dailyMinutes"
                  type="number"
                  min={5}
                  max={480}
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(e.target.value)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generating || !dailyMinutes}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {generating ? "Generating..." : "Generate Plan"}
            </Button>
          </CardContent>
        </Card>

        {plan && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">Weekly Plan</CardTitle>
                    <Badge variant="secondary">{dailyMinutes} min/day</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={handleSave} disabled={saving}>
                      <Save className="h-3 w-3" /> {saving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {doneTasks}/{totalTasks} tasks done
                    </span>
                    <span className="text-muted-foreground">
                      {totalMinutes} min/week
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.days
                  .filter((d) => d.duration > 0)
                  .map((day) => {
                    const dayDone = day.tasks.filter((_, i) =>
                      completedTasks.has(`${day.day}-${i}`)
                    ).length
                    return (
                      <div
                        key={day.day}
                        className="rounded-lg border p-4 transition-colors hover:bg-muted/30"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold w-20">
                              {day.day.slice(0, 3)}
                            </span>
                            <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{
                                  width: `${(dayDone / day.tasks.length) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {day.duration} min
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {day.tasks.map((task, ti) => {
                            const taskKey = `${day.day}-${ti}`
                            const done = completedTasks.has(taskKey)
                            return (
                              <button
                                key={taskKey}
                                onClick={() => toggleTask(taskKey)}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted/50"
                              >
                                {done ? (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                                ) : (
                                  <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                                )}
                                <span className={done ? "line-through text-muted-foreground" : ""}>
                                  {task}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}

                {plan.tips.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <button
                        onClick={() => setShowTips(!showTips)}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        Tips
                        {showTips ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                      {showTips && (
                        <ul className="mt-2 space-y-1">
                          {plan.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {plans.length > 0 && (
          <>
            <h2 className="mb-4 text-xl font-semibold">Saved Plans</h2>
            <div className="space-y-3">
              {plans.map((plan) => (
                <Card key={plan.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{plan.title || "Study Plan"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(plan.created_at).toLocaleDateString()} — {(plan.weekly_schedule as any[])?.length || 0} days
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Saved</Badge>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  )
}
