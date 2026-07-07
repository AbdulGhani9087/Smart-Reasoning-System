import PlanDetailClient from "@/components/PlanDetailClient";

export default async function SavedPlanDetailPage({ params }) {
  const { id } = await params;

  return <PlanDetailClient planId={id} />;
}