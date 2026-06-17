"use client";

import { useMemo, useState } from "react";
import { AgentCard } from "@/components/agents/agent-card";
import { GlassCard } from "@/components/ui/glass-card";
import { recommendTemplate } from "@/lib/analytics";
import type { AgentCatalog, TeamTemplate } from "@/types/catalog";

export function TeamGeneratorClient({ catalog }: { catalog: AgentCatalog }) {
  const [filters, setFilters] = useState<Partial<TeamTemplate>>({
    goal: "Deploy governed AI transformation",
    budget: "High",
    industry: "Consulting",
    complexity: "Enterprise",
    timeline: "60-day rollout"
  });

  const recommendations = useMemo(() => recommendTemplate(catalog, filters), [catalog, filters]);
  const best = recommendations[0];
  const bestAgents = best ? best.agentSlugs.map((slug) => catalog.agents.find((agent) => agent.slug === slug)).filter(Boolean) : [];
  const bestNodes = best ? best.synergyNodeSlugs.map((slug) => catalog.synergyNodes.find((node) => node.slug === slug)).filter(Boolean) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <GlassCard color="#A3E635" elevation={3} className="p-5">
        <h2 className="font-display text-2xl font-semibold text-white">Generator Inputs</h2>
        <p className="mt-2 text-sm text-slate-400">Choose operating constraints and the engine ranks prebuilt team templates.</p>
        <div className="mt-6 space-y-4">
          <Field label="Goal">
            <textarea
              value={filters.goal ?? ""}
              onChange={(event) => setFilters((state) => ({ ...state, goal: event.target.value }))}
              className="min-h-24 w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
            />
          </Field>
          <Field label="Budget">
            <select
              value={filters.budget ?? "Medium"}
              onChange={(event) => setFilters((state) => ({ ...state, budget: event.target.value }))}
              className="w-full rounded-full border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </Field>
          <Field label="Industry">
            <input
              value={filters.industry ?? ""}
              onChange={(event) => setFilters((state) => ({ ...state, industry: event.target.value }))}
              className="w-full rounded-full border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
            />
          </Field>
          <Field label="Complexity">
            <select
              value={filters.complexity ?? "Medium"}
              onChange={(event) => setFilters((state) => ({ ...state, complexity: event.target.value as TeamTemplate["complexity"] }))}
              className="w-full rounded-full border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Enterprise</option>
            </select>
          </Field>
          <Field label="Timeline">
            <input
              value={filters.timeline ?? ""}
              onChange={(event) => setFilters((state) => ({ ...state, timeline: event.target.value }))}
              className="w-full rounded-full border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
            />
          </Field>
        </div>
      </GlassCard>

      <section>
        {best ? (
          <GlassCard color="#A3E635" elevation={3} className="mb-6 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime-200">Best recommendation</p>
            <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h2 className="font-display text-3xl font-semibold text-white">{best.name}</h2>
                <p className="mt-2 max-w-2xl text-slate-300">{best.goal}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-5 py-4 text-center">
                <p className="font-mono text-4xl text-white">{best.matchScore}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Outcome</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {bestNodes.map((node) => (
                <div key={node.slug} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="font-display text-sm text-white">{node.name}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{node.useCase}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bestAgents.map((agent) => {
            const theme = catalog.divisions.find((division) => division.slug === agent.divisionSlug)?.theme;
            return <AgentCard key={agent.slug} agent={agent} color={theme?.color ?? "#A3E635"} />;
          })}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-[0.24em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}
