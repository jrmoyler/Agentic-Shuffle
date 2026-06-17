import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";
import { isDefined } from "@/lib/utils";

export default function SynergyExplorerPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-8">
      <GlassCard color="#F43F5E" elevation={3} className="p-8">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-rose-100/70">Synergy node explorer</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">20 cross-division activation nodes.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Hover each floating card to reveal participating divisions, use case, revenue phase, capabilities, and expected outcomes.</p>
      </GlassCard>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {catalog.synergyNodes.map((node, index) => {
          const divisions = node.participatingDivisions
            .map((slug) => catalog.divisions.find((division) => division.slug === slug))
            .filter(isDefined);
          const color = divisions[0]?.theme.color ?? "#F43F5E";

          return (
            <GlassCard key={node.slug} color={color} elevation={2} className="group min-h-80 p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">Node {index + 1}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-sm text-white">{node.score}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">{node.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{node.useCase}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {divisions.map((division) => (
                  <span key={division.slug} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
                    {division.name}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid gap-3 opacity-75 transition group-hover:opacity-100">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Revenue phase</p>
                  <p className="mt-2 text-white">{node.revenuePhase}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Expected outcomes</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-400">
                    {node.expectedOutcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
