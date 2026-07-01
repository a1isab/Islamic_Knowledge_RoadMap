export type Difficulty = "beginner" | "intermediate" | "advanced"

export type NodeStatus = "locked" | "available" | "in_progress" | "completed"

export interface Position {
  x: number
  y: number
}

export interface Prerequisite {
  nodeId: string
}

export interface Resource {
  id: string
  nodeId: string
  title: string
  type: "book" | "video" | "article" | "course"
  url?: string
  author?: string
  description?: string
  isVerified: boolean
}

export interface RoadmapNode {
  id: string
  roadmapId: string
  title: string
  description: string
  difficulty: Difficulty
  estimatedHours: number
  prerequisites: Prerequisite[]
  position: Position
  sortOrder: number
  stage: number
  resources: Resource[]
}

export interface Roadmap {
  id: string
  slug: string
  title: string
  description: string
  category: RoadmapCategory
  icon?: string
  sortOrder: number
  nodes: RoadmapNode[]
}

export type RoadmapCategory =
  | "arabic"
  | "aqeedah"
  | "fiqh"
  | "hadith"
  | "tafsir"
  | "seerah"
  | "hifdh"
  | "islamic_history"

export interface UserProgress {
  nodeId: string
  status: NodeStatus
  notes?: string
  completedAt?: string
}

export interface Achievement {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  criteria: AchievementCriteria
}

export interface AchievementCriteria {
  type: "complete_roadmap" | "streak" | "complete_books" | "join_groups"
  count: number
}

export interface StudyPlan {
  id: string
  userId: string
  title: string
  weeklySchedule: WeeklyDay[]
  isAiGenerated: boolean
  createdAt: string
}

export interface WeeklyDay {
  day: string
  tasks: StudyTask[]
}

export interface StudyTask {
  nodeId: string
  hours: number
}

export interface Bookmark {
  id: string
  resourceId: string
  createdAt: string
}
