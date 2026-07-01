"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, Clock, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

export default function PlannerPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [dailyMinutes, setDailyMinutes] = useState("30")
  const [schedule, setSchedule] = useState<string | null>(null)
  const [plans, setPlans] = useState<any[]>([])
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

  const handleGenerate = async () => {
    setGenerating(true)
    setSchedule(null)

    try {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dailyMinutes: parseInt(dailyMinutes),
          userId: user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate plan")

      const data = await response.json()
      setSchedule(data.schedule)

      toast.success("Study plan generated!")
    } catch (error) {
      toast.error("Could not generate plan. Check your API key.")
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <Skeleton className="mb-8 h-8 w-48" />
          <Skeleton className="h-64" />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                AI Study Planner
              </h1>
              <p className="text-muted-foreground">
                Generate a personalized weekly study schedule based on your
                available time and goals.
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Your Study Preferences</CardTitle>
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

            <div className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
              <p>
                AI-generated suggestions are for planning purposes only. Always
                verify study material recommendations with qualified teachers.
                No religious rulings are issued.
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generating || !dailyMinutes}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {generating ? "Generating..." : "Generate Study Plan"}
            </Button>
          </CardContent>
        </Card>

        {schedule && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Weekly Plan</CardTitle>
                <Badge variant="secondary">AI-generated</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {schedule}
              </div>
            </CardContent>
          </Card>
        )}

        {plans.length > 0 && (
          <>
            <h2 className="mb-4 text-xl font-semibold">Previous Plans</h2>
            <div className="space-y-3">
              {plans.map((plan) => (
                <Card key={plan.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {plan.title || "Study Plan"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(plan.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">Saved</Badge>
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
