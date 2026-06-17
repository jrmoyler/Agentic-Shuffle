import { BuilderClient } from "@/components/builder/builder-client";
import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";

export default function BuilderPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-8">
      <GlassCard color="#22D3EE" elevation={3} className="p-8">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/70">Core feature</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">Agent Shuffle Builder</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Select agents into a workspace and calculate coverage, skill overlap, capability gaps, division diversity, effectiveness, complexity, synergy, and Aegis risk.
        </p>
      </GlassCard>
      <BuilderClient catalog={catalog} />
    </div>
  );
}
