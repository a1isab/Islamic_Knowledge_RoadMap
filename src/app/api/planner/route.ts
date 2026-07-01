import { NextResponse } from "next/server"

interface PlannerDay {
  day: string
  duration: number
  tasks: string[]
}

interface WeekPlan {
  days: PlannerDay[]
  tips: string[]
}

const templates: Record<number, WeekPlan> = {
  15: {
    days: [
      { day: "Monday", duration: 15, tasks: ["Review Arabic Alphabet — practice writing 5 letters"] },
      { day: "Tuesday", duration: 15, tasks: ["Basic Reading — read 3 short words with tashkeel"] },
      { day: "Wednesday", duration: 15, tasks: ["Vocabulary — learn 5 new words using flashcards"] },
      { day: "Thursday", duration: 15, tasks: ["Grammar — study one noun form and its plural"] },
      { day: "Friday", duration: 15, tasks: ["Review week's material — re-read notes"] },
      { day: "Saturday", duration: 15, tasks: ["Practice reading a short sentence"] },
      { day: "Sunday", duration: 0, tasks: ["Rest day — no study"] },
    ],
    tips: ["Consistency matters more than duration. Even 15 minutes daily builds momentum."],
  },
  30: {
    days: [
      { day: "Monday", duration: 30, tasks: ["Arabic Alphabet — letter recognition + makharij practice"] },
      { day: "Tuesday", duration: 30, tasks: ["Basic Reading — read one full page with tajweed rules"] },
      { day: "Wednesday", duration: 30, tasks: ["Vocabulary — learn 10 new words + write sentences"] },
      { day: "Thursday", duration: 30, tasks: ["Grammar — study verb conjugation patterns"] },
      { day: "Friday", duration: 30, tasks: ["Review week's material + practice writing"] },
      { day: "Saturday", duration: 30, tasks: ["Madinah Book 1 — study one lesson"] },
      { day: "Sunday", duration: 0, tasks: ["Rest or light review"] },
    ],
    tips: ["Split your time into 20 min new material + 10 min review for maximum retention."],
  },
  45: {
    days: [
      { day: "Monday", duration: 45, tasks: ["Arabic Alphabet review + Basic Reading practice"] },
      { day: "Tuesday", duration: 45, tasks: ["Madinah Book 1 — study lesson + complete exercises"] },
      { day: "Wednesday", duration: 45, tasks: ["Vocabulary building — 15 new words + context sentences"] },
      { day: "Thursday", duration: 45, tasks: ["Grammar deep dive — verb forms and sentence structure"] },
      { day: "Friday", duration: 45, tasks: ["Review week + practice reading a short text"] },
      { day: "Saturday", duration: 45, tasks: ["Madinah Book 1 — next lesson + written practice"] },
      { day: "Sunday", duration: 30, tasks: ["Light review of week's material"] },
    ],
    tips: ["Use the Madinah Arabic Reader series alongside YouTube playlists from the Arabic roadmap."],
  },
  60: {
    days: [
      { day: "Monday", duration: 60, tasks: ["Madinah Book 1 — lesson study + vocabulary practice"] },
      { day: "Tuesday", duration: 60, tasks: ["Grammar study — sentence structure + exercises"] },
      { day: "Wednesday", duration: 60, tasks: ["Reading practice — read one page aloud + translate"] },
      { day: "Thursday", duration: 60, tasks: ["Madinah Book 1 — exercises + writing practice"] },
      { day: "Friday", duration: 60, tasks: ["Review week — re-read lessons + self-test"] },
      { day: "Saturday", duration: 60, tasks: ["New vocabulary + listening practice"] },
      { day: "Sunday", duration: 30, tasks: ["Light review and plan next week"] },
    ],
    tips: ["Pair Madinah Book 1 with the free video series on YouTube for guided instruction."],
  },
  90: {
    days: [
      { day: "Monday", duration: 90, tasks: ["Madinah Book 1 — full lesson + vocabulary + grammar notes"] },
      { day: "Tuesday", duration: 90, tasks: ["Reading and translation practice + exercises"] },
      { day: "Wednesday", duration: 90, tasks: ["Grammar deep study — conjugation + sentence analysis"] },
      { day: "Thursday", duration: 90, tasks: ["Madinah Book 2 preview — advanced vocabulary building"] },
      { day: "Friday", duration: 90, tasks: ["Week review — re-read all lessons + written summary"] },
      { day: "Saturday", duration: 90, tasks: ["Practice with a study partner or record yourself reading"] },
      { day: "Sunday", duration: 45, tasks: ["Light review and plan next week"] },
    ],
    tips: ["At this pace, you can complete Madinah Book 1 in 3-4 weeks. Consider joining a study circle for accountability."],
  },
}

export async function POST(request: Request) {
  try {
    const { dailyMinutes } = await request.json()
    const minutes = parseInt(dailyMinutes)

    const keys = Object.keys(templates).map(Number).sort((a, b) => a - b)
    const closest = keys.reduce((prev, curr) =>
      Math.abs(curr - minutes) < Math.abs(prev - minutes) ? curr : prev
    )

    const plan = templates[closest] || templates[30]

    return NextResponse.json({ schedule: plan })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
