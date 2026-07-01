"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpenText, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email })
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpenText className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            IlmRoadmap
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

          {user ? (
            <>
              <Link href="/roadmaps">
                <Button variant="ghost">Roadmaps</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/bookmarks">Bookmarks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/planner">Study Planner</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
