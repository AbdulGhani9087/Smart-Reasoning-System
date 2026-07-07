import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";
import { PlanSchema, extractJsonFromText } from "@/lib/planSchema";
import { getCurrentUser } from "@/lib/auth";
export const runtime = "nodejs";

export async function POST(request) {

  try {
    const user = await getCurrentUser();

if (!user) {
  return NextResponse.json(
    {
      success: false,
      error: "You must be logged in to generate a plan.",
    },
    { status: 401 }
  );
}
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { success: false, error: "OPENROUTER_API_KEY is missing in .env.local" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const task = body.task;
    const highPrecision = body.highPrecision || false;
    const fileName = body.fileName || null;
    const referenceText = body.referenceText || "";
    console.log("File Name:", fileName);
    console.log("Reference Text Length:", referenceText.length);
    console.log("Reference Text Preview:", referenceText.slice(0, 200));

    if (!task || typeof task !== "string" || task.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a clear task with at least 10 characters." },
        { status: 400 }
      );
    }

   const systemPrompt = `
You are PlanWise AI, a smart reasoning and agentic task planning assistant.

Your job is to convert a complex user task into a clear, practical, step-by-step execution blueprint.

Return ONLY valid JSON.
Do not return markdown.
Do not use code fences.
Do not explain outside JSON.
Do not reveal hidden chain-of-thought.

JSON format must be exactly:

{
  "goal": "string",
  "assumptions": ["string"],
  "missingInfo": ["string"],
  "recommendedTools": ["string"],
  "risks": ["string"],
  "agentAssignments": [
    {
      "agentName": "string",
      "responsibility": "string",
      "output": "string"
    }
  ],
  "steps": [
    {
      "title": "string",
      "why": "string",
      "priority": "High | Medium | Low",
      "tasks": ["string"],
      "tools": ["string"],
      "risks": ["string"]
    }
  ],
  "finalActionPlan": ["string"]
}

Rules:
- Give 4 to 7 steps.
- Each step must have 2 to 5 tasks.
- Each step must include tools and risks.
- Agent assignments should include Planner Agent, Research Agent, Builder Agent, and Reviewer Agent when relevant.
- Keep the explanation beginner-friendly.
- Make the plan practical for real implementation.
`;

    const userPrompt = `
User task:
${task}

High precision mode:
${highPrecision ? "Yes, make it more detailed." : "No, keep it practical."}

Uploaded reference file:
${fileName ? fileName : "No file uploaded."}

Reference document content:
${referenceText ? referenceText : "No reference content provided."}

Important:
If reference document content is provided, use it to make the plan more accurate.
Do not copy the reference text directly.
Extract useful requirements, constraints, tools, and project context from it.
`;
    const completion = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat-v3.1:free",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: highPrecision ? 0.2 : 0.4,
      max_tokens: 1800,
    });

    const aiText = completion.choices?.[0]?.message?.content;

    if (!aiText) {
      return NextResponse.json(
        { success: false, error: "No response received from AI model." },
        { status: 500 }
      );
    }

    const parsedJson = extractJsonFromText(aiText);
    const validatedPlan = PlanSchema.parse(parsedJson);

    return NextResponse.json({
      success: true,
      plan: validatedPlan,
    });
  } catch (error) {
    console.error("Generate plan error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate plan.",
      },
      { status: 500 }
    );
  }
}