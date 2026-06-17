import { NextResponse } from "next/server";
import { getCatalog } from "@/data/catalog";
import { simulateSelection } from "@/lib/analytics";

export async function POST(request: Request) {
  const catalog = getCatalog();
  const body = (await request.json()) as { agentSlugs?: string[] };
  const slugs = new Set(body.agentSlugs ?? []);
  const selectedAgents = catalog.agents.filter((agent) => slugs.has(agent.slug));

  return NextResponse.json(simulateSelection(selectedAgents, catalog));
}
