"use client";

import { useMemo, useState } from "react";
import { AgentCard } from "@/components/agents/agent-card";
import { CssBarChart } from "@/components/charts/css-bar-chart";
import { GlassCard } from "@/components/ui/glass-card";
import { generateOutcomes, simulateSelection } from "@/lib/analytics";
import { useBuilderStore } from "@/store/builder-store";
import type { AgentCatalog } from "@/types/catalog";

export function BuilderClient({ catalog }: { catalog: AgentCatalog }) {
  const [query, setQuery] = useState("");
  const { selected, toggleAgent, removeAgent, clear } = useBuilderStore();
  const selectedSlugs = new Set(selected.map((agent) => agent.slug));
  const simulation = useMemo(() => simulateSelection(selected, catalog), [catalog, selected]);
  const outcomes = useMemo(() => generateOutcomes(selected), [selected]);
  const candidateAgents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return catalog.agents
      .filter((agent) => agent.tier !== "Tier 0 - Master Overseer")
      .filter((agent) => !normalized || [agent.name, agent.role, agent.divisionName, agent.capabilities.join(" ")].join(" ").toLowerCase().includes(normalized))
      .slice(0, 36);
  }, [catalog.agents, query]);

  const metrics = [
    { label: "Coverage", value: simulation.coverage, color: "#22D3EE" },
    { label: "Synergy", value: simulation.synergyScore, color: "#A3E635" },
    { label: "Diversity", value: simulation.divisionDiversity, color: "#8B5CF6" },
    { label: "Effectiveness", value: simulation.estimatedEffectiveness, color: "#F43F5E" },
    { label: "Complexity", value: simulation.executionComplexity, color: "#F59E0B" },
    { label: "Aegis risk", value: simulation.aegisRiskScore, color: "#DC2626" }
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <section>
        <div className="mb-5 flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl md:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find agents to add to the shuffle workspace..."
            className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/50 px-5 py-3 text-sm text-white outline-none focus:border-cyan-200/50"
          />
          <button type="button" onClick={clear} className="rounded-full border border-white/10 px-5 py-3 text-sm text-slate-300 hover:text-white">
            Clear workspace
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {candidateAgents.map((agent) => {
            const theme = catalog.divisions.find((division) => division.slug === agent.divisionSlug)?.theme;
            return (
              <AgentCard
                key={agent.slug}
                agent={agent}
                color={theme?.color ?? "#7C3AED"}
                selected={selectedSlugs.has(agent.slug)}
                onToggle={toggleAgent}
              />
            );
          })}
        </div>
      </section>

      <aside className="xl:sticky xl:top-28 xl:self-start">
        <GlassCard color="#22D3EE" elevation={3} className="p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">Shuffle Workspace</h2>
              <p className="mt-1 text-sm text-slate-400">{selected.length} agents selected</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-sm text-white">{simulation.synergyScore}</span>
          </div>
          <div className="mb-5 max-h-64 space-y-2 overflow-auto pr-2 premium-scrollbar">
            {selected.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm text-slate-400">Select agents to calculate coverage, overlap, gaps, risk, and outcomes.</p>
            ) : (
              selected.map((agent) => (
                <div key={agent.slug} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm text-white">{agent.name}</p>
                    <p className="truncate text-xs text-slate-500">{agent.divisionName}</p>
                  </div>
                  <button type="button" onClick={() => removeAgent(agent.slug)} className="rounded-full px-3 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white">
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <CssBarChart title="Simulation results" data={metrics} maxItems={6} color="#22D3EE" />
          <div className="mt-5">
            <h3 className="font-display text-lg text-white">Capability gaps</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {simulation.capabilityGaps.map((gap) => (
                <span key={gap} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
                  {gap}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {outcomes.slice(0, 3).map((outcome) => (
              <div key={outcome.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <h3 className="font-display text-sm text-white">{outcome.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">{outcome.body}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </aside>
    </div>
  );
}
