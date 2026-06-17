"use client";

import { useMemo, useState } from "react";
import { AgentCard } from "@/components/agents/agent-card";
import type { Agent, Division } from "@/types/catalog";

type ViewMode = "grid" | "masonry" | "kanban" | "table" | "depth";

type AgentDirectoryClientProps = {
  agents: Agent[];
  divisions: Division[];
};

export function AgentDirectoryClient({ agents, divisions }: AgentDirectoryClientProps) {
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState("compatibility");

  const filteredAgents = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return agents
      .filter((agent) => division === "all" || agent.divisionSlug === division)
      .filter((agent) =>
        !normalized ||
        [agent.name, agent.role, agent.prompt, agent.capabilities.join(" "), agent.tools.join(" "), agent.divisionName]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .sort((a, b) => {
        switch (sort) {
          case "name":
            return a.name.localeCompare(b.name);
          case "tools":
            return b.tools.length - a.tools.length;
          case "complexity":
            return b.executionComplexity - a.executionComplexity;
          case "compatibility":
          default:
            return b.compatibilityScore - a.compatibilityScore;
        }
      });
  }, [agents, division, query, sort]);

  const gridClass =
    view === "table"
      ? "grid gap-3"
      : view === "kanban"
        ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        : view === "masonry"
          ? "columns-1 gap-4 md:columns-2 xl:columns-3"
          : "grid gap-4 md:grid-cols-2 xl:grid-cols-3";

  return (
    <section>
      <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_180px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, role, division, capability, tool, prompt..."
            className="rounded-full border border-white/10 bg-slate-950/50 px-5 py-3 text-sm text-white outline-none transition focus:border-cyan-200/50"
          />
          <select
            value={division}
            onChange={(event) => setDivision(event.target.value)}
            className="rounded-full border border-white/10 bg-slate-950/50 px-5 py-3 text-sm text-white outline-none"
          >
            <option value="all">All divisions</option>
            {divisions.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-white/10 bg-slate-950/50 px-5 py-3 text-sm text-white outline-none"
          >
            <option value="compatibility">Compatibility</option>
            <option value="name">Name</option>
            <option value="tools">Tool count</option>
            <option value="complexity">Complexity</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {(["grid", "masonry", "kanban", "table", "depth"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={`rounded-full border px-4 py-2 text-sm capitalize transition ${
                view === mode ? "border-cyan-200/50 bg-cyan-200/10 text-white" : "border-white/10 bg-white/[0.04] text-slate-400"
              }`}
            >
              {mode === "depth" ? "3D card view" : mode}
            </button>
          ))}
          <span className="ml-auto font-mono text-sm text-slate-500">{filteredAgents.length} visible</span>
        </div>
      </div>

      <div className={gridClass}>
        {filteredAgents.map((agent) => {
          const theme = divisions.find((item) => item.slug === agent.divisionSlug)?.theme;
          const card = <AgentCard key={agent.slug} agent={agent} color={theme?.color ?? "#7C3AED"} view={view} />;

          return view === "masonry" ? (
            <div key={agent.slug} className="mb-4 break-inside-avoid">
              {card}
            </div>
          ) : (
            card
          );
        })}
      </div>
    </section>
  );
}
