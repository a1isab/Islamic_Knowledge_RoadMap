"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Map,
  Users,
  Trophy,
  CalendarClock,
  LogOut,
  ChevronLeft,
  Shield,
  BookOpenText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/roadmaps", label: "Roadmaps", icon: Map },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/plans", label: "Study Plans", icon: CalendarClock },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false)
      return
    }

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/admin/login")
        return
      }
      setUser(data.user)

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", data.user.id)
        .single()

      const p = profileData as { full_name: string | null; role: string } | null

      if (!p || p.role !== "admin") {
        await supabase.auth.signOut()
        router.push("/admin/login")
        return
      }

      setProfile(p)
      setLoading(false)
    })
  }, [pathname])

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col border-r bg-muted/30">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t p-4">
          <div className="mb-3 flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {(profile?.full_name || user?.email || "A")
                  .charAt(0)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium truncate">
                {profile?.full_name || "Admin"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs">
                <ChevronLeft className="h-3 w-3" />
                Back to site
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-xs text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="h-3 w-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="flex h-16 items-center justify-between border-b px-8">
          <h2 className="text-lg font-semibold">
            {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
          </h2>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
