"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Map, Trophy, BookOpenText } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    roadmaps: 0,
    achievements: 0,
    completed: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("roadmaps").select("id", { count: "exact", head: true }),
      supabase.from("achievements").select("id", { count: "exact", head: true }),
      supabase.from("user_progress").select("id", { count: "exact", head: true }).eq("status", "completed"),
    ]).then(([users, roadmaps, achievements, completed]) => {
      setStats({
        users: users.count || 0,
        roadmaps: roadmaps.count || 0,
        achievements: achievements.count || 0,
        completed: completed.count || 0,
      })
      setLoading(false)
    })
  }, [])

  const cards = [
    { title: "Total Users", value: stats.users, icon: Users },
    { title: "Roadmaps", value: stats.roadmaps, icon: Map },
    { title: "Achievements", value: stats.achievements, icon: Trophy },
    { title: "Nodes Completed", value: stats.completed, icon: BookOpenText },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and statistics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-3xl font-bold">{card.value}</div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
