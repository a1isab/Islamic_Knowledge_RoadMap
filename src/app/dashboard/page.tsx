"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BookOpenText,
  Flame,
  Trophy,
  ArrowRight,
  Route,
  Sparkles,
} from "lucide-react"
import { roadmaps } from "@/data/arabic-roadmap"
import type { UserProgress } from "@/types/roadmap"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<UserProgress[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login")
        return
      }
      setUser(data.user)
      fetchProgress(data.user.id)
    })
  }, [])

  const fetchProgress = async (userId: string) => {
    const { data } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)

    if (data) {
      setProgress(data as UserProgress[])
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Skeleton className="mb-8 h-8 w-48" />
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </>
    )
  }

  const completedNodes = progress.filter((p) => p.status === "completed").length
  const totalNodes = roadmaps.reduce((acc, r) => acc + r.nodes.length, 0)
  const completionPercent = totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.full_name || "Student"}
            </p>
          </div>
          <Link href="/planner">
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" /> AI Planner
            </Button>
          </Link>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Progress
              </CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedNodes}/{totalNodes}
              </div>
              <p className="text-xs text-muted-foreground">nodes completed</p>
              <Progress value={completionPercent} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">days</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Study daily to build your streak
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Achievements
              </CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">earned</p>
              <Link href="/achievements">
                <p className="mt-2 text-xs font-medium text-primary hover:underline">
                  View all achievements
                </p>
              </Link>
            </CardContent>
          </Card>
        </div>

        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Your Roadmaps
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {roadmaps.map((roadmap) => {
            const roadmapProgress = progress.filter((p) =>
              roadmap.nodes.some((n) => n.id === p.nodeId)
            )
            const roadmapCompleted = roadmapProgress.filter(
              (p) => p.status === "completed"
            ).length
            const roadmapPercent =
              roadmap.nodes.length > 0
                ? (roadmapCompleted / roadmap.nodes.length) * 100
                : 0

            return (
              <Link key={roadmap.id} href={`/roadmaps/${roadmap.slug}`}>
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpenText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{roadmap.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {roadmapCompleted}/{roadmap.nodes.length} nodes
                        </p>
                      </div>
                    </div>
                    <Progress value={roadmapPercent} className="mb-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {Math.round(roadmapPercent)}% complete
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </>
  )
}
