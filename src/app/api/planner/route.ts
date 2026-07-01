import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are an AI study planner assistant for an Islamic knowledge learning platform.

Your ONLY role is to create weekly study schedules based on:
- The user's available daily study time
- Their selected learning roadmaps (Arabic language)
- Their current progress

ABSOLUTE RULES:
- NEVER issue fatwas or religious rulings
- NEVER interpret Islamic texts
- NEVER make claims about religious correctness
- NEVER fabricate books, scholars, or sources
- NEVER use authoritative religious language
- Clearly label all suggestions as "AI-generated recommendation"
- Only reference books and materials from the provided roadmap data
- If asked about religious matters outside scheduling, politely decline

Format the response as a clear weekly schedule with:
- Day of week
- Topics to study (from the roadmap)
- Estimated time per topic
- Recommended resources from the curriculum
- A disclaimer at the end

Be encouraging but not preachy. Focus on practical studying advice.`

export async function POST(request: Request) {
  try {
    const { dailyMinutes } = await request.json()

    const prompt = `Create a weekly study schedule for an Arabic language student.
They have ${dailyMinutes} minutes available per day.
They are following the Madinah Arabic curriculum (stages 1-5).
Focus on consistent daily practice. Include review days.

Remember: AI-generated recommendation only. No religious rulings.`

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("OpenAI API error:", error)
      return NextResponse.json(
        { error: "Failed to generate plan" },
        { status: 500 }
      )
    }

    const data = await response.json()
    const schedule = data.choices[0]?.message?.content

    return NextResponse.json({ schedule })
  } catch (error) {
    console.error("Planner error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
