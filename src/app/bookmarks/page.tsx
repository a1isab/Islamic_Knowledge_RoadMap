"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, ArrowLeft } from "lucide-react"

export default function BookmarksPage() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login")
        return
      }
      setUser(data.user)

      const { data: userBookmarks } = await supabase
        .from("bookmarks")
        .select("*, resources(*)")
        .eq("user_id", data.user.id)

      if (userBookmarks) setBookmarks(userBookmarks)
    })
  }, [])

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
            <p className="text-muted-foreground">
              Resources you&apos;ve saved for later.
            </p>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="font-medium">No bookmarks yet</p>
              <p className="text-sm text-muted-foreground">
                Bookmark resources from roadmaps to save them here.
              </p>
            </div>
            <Link href="/roadmaps">
              <Button variant="outline">Explore Roadmaps</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <Card key={bookmark.id}>
                <CardContent className="p-4">
                  <p className="font-medium">
                    {bookmark.resources?.title || "Unknown resource"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Bookmarked{" "}
                    {new Date(bookmark.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
