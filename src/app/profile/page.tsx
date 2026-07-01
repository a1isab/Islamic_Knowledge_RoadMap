"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Clock, LogOut } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState("")
  const [dailyMinutes, setDailyMinutes] = useState("30")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login")
        return
      }
      setUser(data.user)

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (profileData) {
        const p = profileData as Record<string, unknown>
        setProfile(p)
        setFullName(String(p.full_name || ""))
        setDailyMinutes(String(p.study_minutes_daily || 30))
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        study_minutes_daily: parseInt(dailyMinutes),
      })
      .eq("id", user.id)

    if (error) {
      toast.error("Failed to save profile")
    } else {
      toast.success("Profile updated")
    }
    setSaving(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <Skeleton className="mb-8 h-8 w-32" />
          <Skeleton className="h-64" />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {fullName.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4" /> Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" /> Study Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dailyMinutes">
                Daily study goal (minutes)
              </Label>
              <Input
                id="dailyMinutes"
                type="number"
                min={5}
                max={480}
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(e.target.value)}
                className="w-24"
              />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={saving} className="mb-4">
          {saving ? "Saving..." : "Save Changes"}
        </Button>

        <Separator className="my-6" />

        <Button
          variant="outline"
          className="gap-2 text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </main>
    </>
  )
}
