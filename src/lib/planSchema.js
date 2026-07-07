import { z } from "zod";

const StepSchema = z.object({
  title: z.string(),
  why: z.string(),
  priority: z.string().optional().default("Medium"),
  tasks: z.array(z.string()).default([]),
  tools: z.array(z.string()).optional().default([]),
  risks: z.array(z.string()).optional().default([]),
});

const AgentAssignmentSchema = z.object({
  agentName: z.string(),
  responsibility: z.string(),
  output: z.string(),
});

export const PlanSchema = z.object({
  goal: z.string(),
  assumptions: z.array(z.string()).default([]),
  missingInfo: z.array(z.string()).default([]),
  recommendedTools: z.array(z.string()).optional().default([]),
  risks: z.array(z.string()).optional().default([]),
  agentAssignments: z.array(AgentAssignmentSchema).optional().default([]),
  steps: z.array(StepSchema).default([]),
  finalActionPlan: z.array(z.string()).default([]),
});

export function extractJsonFromText(text) {
  try {
    return JSON.parse(text);
  } catch {
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("AI did not return valid JSON.");
    }

    const jsonText = text.slice(firstBrace, lastBrace + 1);
    return JSON.parse(jsonText);
  }
}