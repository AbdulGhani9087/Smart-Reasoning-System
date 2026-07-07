import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

function formatPlan(item) {
  return {
    id: item.id,
    task: item.task,
    goal: item.goal,
    assumptions: JSON.parse(item.assumptions),
    missingInfo: JSON.parse(item.missingInfo),
    steps: JSON.parse(item.steps),
    finalActionPlan: JSON.parse(item.finalActionPlan),
    recommendedTools: JSON.parse(item.recommendedTools || "[]"),
    risks: JSON.parse(item.risks || "[]"),
    agentAssignments: JSON.parse(item.agentAssignments || "[]"),
    stepProgress: JSON.parse(item.stepProgress || "[]"),
    createdAt: item.createdAt,
  };
}
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in to view saved plans.",
        },
        { status: 401 }
      );
    }

    const plans = await prisma.plan.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      plans: plans.map(formatPlan),
    });
  } catch (error) {
    console.error("Get plans error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch plans.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in to save plans.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { task, plan } = body;

    if (!task || !plan) {
      return NextResponse.json(
        {
          success: false,
          error: "Task and plan are required.",
        },
        { status: 400 }
      );
    }

    const initialProgress = (plan.steps || []).map((step, index) => ({
  stepIndex: index,
  status: "Pending",
  updatedAt: new Date().toISOString(),
}));

const savedPlan = await prisma.plan.create({
  data: {
    task,
    goal: plan.goal,
    assumptions: JSON.stringify(plan.assumptions || []),
    missingInfo: JSON.stringify(plan.missingInfo || []),
    steps: JSON.stringify(plan.steps || []),
    finalActionPlan: JSON.stringify(plan.finalActionPlan || []),
    recommendedTools: JSON.stringify(plan.recommendedTools || []),
    risks: JSON.stringify(plan.risks || []),
    agentAssignments: JSON.stringify(plan.agentAssignments || []),
    stepProgress: JSON.stringify(initialProgress),
    userId: user.id,
  },
});

    return NextResponse.json({
      success: true,
      message: "Plan saved successfully.",
      planId: savedPlan.id,
    });
  } catch (error) {
    console.error("Save plan error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to save plan.",
      },
      { status: 500 }
    );
  }
}