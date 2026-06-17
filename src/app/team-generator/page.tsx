import { TeamGeneratorClient } from "@/components/team/team-generator-client";
import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";

export default function TeamGeneratorPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-8">
      <GlassCard color="#A3E635" elevation={3} className="p-8">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-lime-100/70">Team generator</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">Recommend the best agent stack for a goal, budget, industry, complexity, and timeline.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Ranked templates surface best agents, directors, required synergy nodes, and an expected outcome score.
        </p>
      </GlassCard>
      <TeamGeneratorClient catalog={catalog} />
    </div>
  );
}
