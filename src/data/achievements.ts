import type { Achievement } from "@/types/roadmap"

export const achievements: Achievement[] = [
  {
    id: "the-beginner",
    slug: "the-beginner",
    title: "The Beginner",
    description: "Complete your first roadmap stage.",
    icon: "seedling",
    criteria: { type: "complete_roadmap", count: 1 },
  },
  {
    id: "consistent-student",
    slug: "consistent-student",
    title: "The Consistent Student",
    description: "Maintain a 30-day study streak.",
    icon: "flame",
    criteria: { type: "streak", count: 30 },
  },
  {
    id: "book-collector",
    slug: "book-collector",
    title: "Book Collector",
    description: "Complete 10 books across all roadmaps.",
    icon: "books",
    criteria: { type: "complete_books", count: 10 },
  },
  {
    id: "the-seeker",
    slug: "the-seeker",
    title: "The Seeker",
    description: "Join 3 study circles.",
    icon: "users",
    criteria: { type: "join_groups", count: 3 },
  },
]

export function getAchievementBySlug(slug: string): Achievement | undefined {
  return achievements.find((a) => a.slug === slug)
}
