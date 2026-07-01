import { NextResponse } from "next/server"

const templates: Record<string, string> = {
  "15": `AI-Generated Study Plan (Template)

Based on your available time, here is a suggested weekly plan:

Monday (15 min): Review Arabic Alphabet — practice writing 5 letters
Tuesday (15 min): Basic Reading — read 3 short words with tashkeel
Wednesday (15 min): Vocabulary — learn 5 new words using flashcards
Thursday (15 min): Grammar — study one noun form and its plural
Friday (15 min): Review week's material — re-read notes
Saturday (15 min): Practice reading a short sentence
Sunday: Rest day

Tip: Consistency matters more than duration. Even 15 minutes daily builds momentum.`,

  "30": `AI-Generated Study Plan (Template)

Based on your available time, here is a suggested weekly plan:

Monday (30 min): Arabic Alphabet — letter recognition + makharij practice
Tuesday (30 min): Basic Reading — read one full page with tajweed rules
Wednesday (30 min): Vocabulary — learn 10 new words + write sentences
Thursday (30 min): Grammar — study verb conjugation patterns
Friday (30 min): Review week's material + practice writing
Saturday (30 min): Madinah Book 1 — study one lesson
Sunday: Rest or light review

Tip: Split your time into 20 min new material + 10 min review for maximum retention.`,

  "45": `AI-Generated Study Plan (Template)

Based on your available time, here is a suggested weekly plan:

Monday (45 min): Arabic Alphabet review + Basic Reading practice
Tuesday (45 min): Madinah Book 1 — study lesson + complete exercises
Wednesday (45 min): Vocabulary building — 15 new words + context sentences
Thursday (45 min): Grammar deep dive — verb forms and sentence structure
Friday (45 min): Review week + practice reading a short text
Saturday (45 min): Madinah Book 1 — next lesson + written practice
Sunday (30 min): Light review of week's material

Resources: Use the Madinah Arabic Reader series alongside YouTube playlists from the Arabic roadmap.`,

  "60": `AI-Generated Study Plan (Template)

Based on your available time, here is a suggested weekly plan:

Monday (60 min): Madinah Book 1 — lesson study + vocabulary practice
Tuesday (60 min): Grammar study — sentence structure + exercises
Wednesday (60 min): Reading practice — read one page aloud + translate
Thursday (60 min): Madinah Book 1 — exercises + writing practice
Friday (60 min): Review week — re-read lessons + self-test
Saturday (60 min): New vocabulary + listening practice
Sunday (30 min): Light review and plan next week

Resource recommendation: Pair Madinah Book 1 with the free video series on YouTube for guided instruction.`,

  "90": `AI-Generated Study Plan (Template)

Based on your available time, here is a suggested weekly plan:

Monday (90 min): Madinah Book 1 — full lesson + vocabulary + grammar notes
Tuesday (90 min): Reading and translation practice + exercises
Wednesday (90 min): Grammar deep study — conjugation + sentence analysis
Thursday (90 min): Madinah Book 2 preview — advanced vocabulary building
Friday (90 min): Week review — re-read all lessons + written summary
Saturday (90 min): Practice with a study partner or record yourself reading
Sunday (45 min): Light review and plan next week

Tip: At this pace, you can complete Madinah Book 1 in 3-4 weeks. Consider joining a study circle for accountability.`,
}

export async function POST(request: Request) {
  try {
    const { dailyMinutes } = await request.json()

    const minutes = parseInt(dailyMinutes)

    const templateKey = Object.keys(templates)
      .map(Number)
      .sort((a, b) => Math.abs(a - minutes) - Math.abs(b - minutes))
      .map(String)[0]

    const schedule = templates[templateKey] || templates["30"]

    return NextResponse.json({ schedule })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
