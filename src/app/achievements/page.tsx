"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sprout,
  Flame,
  BookOpenText,
  Users,
  Lock,
} from "lucide-react"
import { achievements } from "@/data/achievements"

const iconMap: Record<string, React.ReactNode> = {
  seedling: <Sprout className="h-6 w-6" />,
  flame: <Flame className="h-6 w-6" />,
  books: <BookOpenText className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
}

export default function AchievementsPage() {
  const [user, setUser] = useState<any>(null)
  const [earned, setEarned] = useState<string[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login")
        return
      }
      setUser(data.user)

      const { data: userAchievements } = await supabase
        .from("user_achievements")
        .select("achievement_id")
        .eq("user_id", data.user.id)

      if (userAchievements) {
        setEarned(userAchievements.map((a: Record<string, unknown>) => String(a.achievement_id)))
      }
    })
  }, [])

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Achievements
          </h1>
          <p className="text-muted-foreground">
            Milestones on your learning journey.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => {
            const isEarned = earned.includes(achievement.id)

            return (
              <Card
                key={achievement.id}
                className={`transition-all ${
                  isEarned
                    ? "border-primary/50 bg-primary/5"
                    : "opacity-60"
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        isEarned
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isEarned ? (
                        iconMap[achievement.icon] || <Lock className="h-6 w-6" />
                      ) : (
                        <Lock className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        {isEarned && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-primary/10 text-primary"
                          >
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </>
  )
}
