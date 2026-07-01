import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import {
  BookOpenText,
  Sparkles,
  Route,
  Trophy,
  Users,
  ArrowRight,
  GraduationCap,
} from "lucide-react"
import { roadmaps } from "@/data/arabic-roadmap"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto max-w-5xl text-center relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <BookOpenText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Your Guided Path to
              <span className="text-primary"> Islamic Knowledge</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Never ask &ldquo;What should I study next?&rdquo; again.
              Follow structured roadmaps for Arabic, Aqeedah, Fiqh, and more.
              Track progress, earn achievements, and learn with confidence.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2 text-base">
                  Start Your Journey <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/roadmaps">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  <Route className="h-4 w-4" /> Explore Roadmaps
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Choose Your Path</h3>
                <p className="text-sm text-muted-foreground">
                  Select a subject — Arabic, Aqeedah, Fiqh — and get a
                  structured roadmap built by scholars.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Study & Track</h3>
                <p className="text-sm text-muted-foreground">
                  Complete nodes, mark books as finished, save notes, and watch
                  your progress grow.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Earn Achievements</h3>
                <p className="text-sm text-muted-foreground">
                  Stay motivated with badges, streaks, and milestones as you
                  advance through your studies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
              Available Roadmaps
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {roadmaps.map((roadmap) => (
                <Link key={roadmap.id} href={`/roadmaps/${roadmap.slug}`}>
                  <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpenText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{roadmap.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {roadmap.nodes.length} stages
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {roadmap.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      Start learning{" "}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
              <div className="relative overflow-hidden rounded-xl border bg-card/50 p-6 opacity-60">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">More Coming Soon</h3>
                    <p className="text-xs text-muted-foreground">
                      Aqeedah, Fiqh, Hadith, Tafsir...
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Additional roadmaps are in development and will be released
                  after the Arabic track is complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Ready to Begin?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join the community of students on a structured path to Islamic
              knowledge.
            </p>
            <Link href="/register">
              <Button size="lg" className="gap-2 text-base">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t px-4 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>IlmRoadmap — Your guided path to Islamic knowledge.</p>
          <p>
            AI acts as an educational assistant only. No fatwas or religious
            rulings are generated.
          </p>
        </div>
      </footer>
    </>
  )
}
