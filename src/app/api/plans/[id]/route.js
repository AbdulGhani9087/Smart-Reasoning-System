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

export async function GET(request, context) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in to view this plan.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const plan = await prisma.plan.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: formatPlan(plan),
    });
  } catch (error) {
    console.error("Get single plan error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch plan.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in to delete this plan.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const existingPlan = await prisma.plan.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingPlan) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan not found.",
        },
        { status: 404 }
      );
    }

    await prisma.plan.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully.",
    });
  } catch (error) {
    console.error("Delete plan error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete plan.",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(request, context) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in to update progress.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const { stepIndex, status } = body;

    const allowedStatuses = ["Pending", "In Progress", "Completed"];

    if (typeof stepIndex !== "number") {
      return NextResponse.json(
        {
          success: false,
          error: "Step index is required.",
        },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status.",
        },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan not found.",
        },
        { status: 404 }
      );
    }

    const steps = JSON.parse(plan.steps || "[]");

    if (stepIndex < 0 || stepIndex >= steps.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid step index.",
        },
        { status: 400 }
      );
    }

    let progress = JSON.parse(plan.stepProgress || "[]");

    if (!Array.isArray(progress) || progress.length === 0) {
      progress = steps.map((step, index) => ({
        stepIndex: index,
        status: "Pending",
        updatedAt: new Date().toISOString(),
      }));
    }

    progress[stepIndex] = {
      stepIndex,
      status,
      updatedAt: new Date().toISOString(),
    };

    const updatedPlan = await prisma.plan.update({
      where: {
        id,
      },
      data: {
        stepProgress: JSON.stringify(progress),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Progress updated successfully.",
      stepProgress: JSON.parse(updatedPlan.stepProgress || "[]"),
    });
  } catch (error) {
    console.error("Update progress error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update progress.",
      },
      { status: 500 }
    );
  }
}