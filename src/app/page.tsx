import Link from "next/link";
import { CssBarChart } from "@/components/charts/css-bar-chart";
import { HeatMap } from "@/components/charts/heat-map";
import { MetricCard } from "@/components/ui/metric-card";
import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";
import { getAgentsByDivision, getAgentsByPlatform, getAgentsByTier, simulateSelection } from "@/lib/analytics";

export default function DashboardPage() {
  const catalog = getCatalog();
  const simulation = simulateSelection(catalog.agents.slice(1, 9), catalog);
  const stats = [
    ["Total Agents", catalog.stats.totalAgents, "Parsed from uploaded roster plus ZENITH.", "#7C3AED"],
    ["Directors", catalog.stats.totalDirectors, "One division director per department.", "#22D3EE"],
    ["Divisions", catalog.stats.totalDivisions, "The full Collective AI operating lattice.", "#A3E635"],
    ["Synergy Nodes", catalog.stats.totalSynergyNodes, "Cross-division revenue and capability loops.", "#F43F5E"],
    ["Platforms", catalog.stats.totalPlatforms, "Creation surfaces normalized from roster.", "#8B5CF6"],
    ["Tools", catalog.stats.totalTools, "Unique tool-stack entries across all agents.", "#F59E0B"]
  ] as const;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard color="#7C3AED" elevation={3} className="p-8">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/70">Visual intelligence platform</p>
          <h1 className="hero-text mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
            Assemble the Collective AI lattice with cinematic precision.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Explore, compare, analyze, simulate, route, and assemble agent teams from ZENITH, 20 directors, 600 specialist agents, and 20 synergy nodes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/builder" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
              Launch Agent Shuffle Builder
            </Link>
            <Link href="/agents" className="rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm text-white transition hover:border-cyan-200/50">
              Open Directory
            </Link>
          </div>
        </GlassCard>
        <GlassCard color="#22D3EE" elevation={2} className="p-6">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-400">Selection simulation</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              ["Coverage", simulation.coverage],
              ["Synergy", simulation.synergyScore],
              ["Diversity", simulation.divisionDiversity],
              ["Aegis Risk", simulation.aegisRiskScore]
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-4 font-mono text-4xl text-white">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, detail, color]) => (
          <MetricCard key={label} label={label} value={value} detail={detail} color={color} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <CssBarChart title="Agents by Division" subtitle="Specialist density by operating department." data={getAgentsByDivision(catalog)} color="#7C3AED" maxItems={10} />
        <CssBarChart title="Agents by Tier" subtitle="Portfolio hierarchy distribution." data={getAgentsByTier(catalog)} color="#22D3EE" />
        <CssBarChart title="Agents by Platform" subtitle="Creation platform usage across the roster." data={getAgentsByPlatform(catalog)} color="#A3E635" />
      </section>

      <HeatMap divisions={catalog.divisions} />
    </div>
  );
}
