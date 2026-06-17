import Image from "next/image";
import Link from "next/link";
import { CssBarChart } from "@/components/charts/css-bar-chart";
import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";

export default function OverseerPage() {
  const catalog = getCatalog();
  const overseer = catalog.overseer;
  const divisionHealth = catalog.divisions.map((division) => ({
    label: division.name,
    value: Math.round(division.agents.reduce((total, agent) => total + agent.effectivenessScore, 0) / division.agents.length),
    color: division.theme.color
  }));

  return (
    <div className="space-y-8">
      <GlassCard color="#7C3AED" elevation={4} className="p-8">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <Image src={overseer.image} alt="ZENITH raster illustration" fill priority className="object-cover" sizes="360px" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-200/80">Tier 0 Master Overseer</p>
            <h1 className="mt-4 font-display text-6xl font-semibold text-white">ZENITH</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{overseer.prompt}</p>
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard color="#22D3EE" elevation={3} className="p-5 lg:col-span-2">
          <h2 className="font-display text-2xl text-white">Authority Tree</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {catalog.divisions.map((division) => (
              <div key={division.slug} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="font-mono text-xs text-slate-500">{division.code}</p>
                <p className="mt-1 font-display text-lg text-white">{division.director.name}</p>
                <p className="mt-1 text-sm text-slate-400">{division.name}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard color="#F43F5E" elevation={3} className="p-5">
          <h2 className="font-display text-2xl text-white">Escalation Tree</h2>
          <div className="mt-6 space-y-3">
            {["Agent output", "Division Director", "Aegis Protocol", "ZENITH", "Human leadership"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="font-mono text-xs text-slate-500">0{index + 1}</p>
                <p className="mt-1 text-white">{step}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <CssBarChart title="Division Health" subtitle="Average effectiveness across specialist clusters." data={divisionHealth} color="#7C3AED" maxItems={20} />
        <GlassCard color="#A3E635" elevation={2} className="p-5">
          <h2 className="font-display text-2xl text-white">Routing Simulation</h2>
          <p className="mt-3 text-slate-300">ZENITH routes complex requests by identifying owned divisions, activating synergy nodes, monitoring execution, and escalating anomalies.</p>
          <div className="mt-6 grid gap-3">
            {catalog.synergyNodes.slice(0, 5).map((node) => (
              <Link key={node.slug} href="/synergy" className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 hover:bg-white/[0.08]">
                <p className="font-display text-white">{node.name}</p>
                <p className="mt-1 text-sm text-slate-400">{node.useCase}</p>
              </Link>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
