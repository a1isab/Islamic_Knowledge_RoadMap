"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpenText, ArrowRight, Lock } from "lucide-react"
import { roadmaps } from "@/data/arabic-roadmap"
import type { Roadmap } from "@/types/roadmap"

const futureRoadmaps: { title: string; description: string }[] = [
  { title: "Aqeedah", description: "Islamic creed and theology" },
  { title: "Hanbali Fiqh", description: "Jurisprudence according to the Hanbali school" },
  { title: "Tafsir", description: "Quranic exegesis and interpretation" },
  { title: "Hadith", description: "Prophetic traditions and sciences" },
  { title: "Seerah", description: "Life and teachings of Prophet Muhammad" },
  { title: "Hifdh", description: "Quran memorization" },
  { title: "Islamic History", description: "Historical development of Islamic civilization" },
]

export default function RoadmapsPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Learning Roadmaps</h1>
          <p className="mt-2 text-muted-foreground">
            Choose a subject and follow a structured path. Each roadmap is curated
            from authentic Islamic sources.
          </p>
        </div>

        <h2 className="mb-4 text-xl font-semibold tracking-tight">Available</h2>
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {roadmaps.map((roadmap) => (
            <Link key={roadmap.id} href={`/roadmaps/${roadmap.slug}`}>
              <Card className="transition-all hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <BookOpenText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{roadmap.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {roadmap.nodes.length} stages
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          MVP
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {roadmap.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    Explore roadmap <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-semibold tracking-tight">Coming Soon</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {futureRoadmaps.map((r) => (
            <Card key={r.title} className="opacity-60">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}
