"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { generateOutcomes, simulateSelection } from "@/lib/analytics";
import { useBuilderStore } from "@/store/builder-store";
import type { AgentCatalog } from "@/types/catalog";

export function OutcomeEngineClient({ catalog }: { catalog: AgentCatalog }) {
  const { selected } = useBuilderStore();
  const activeAgents = selected.length > 0 ? selected : catalog.agents.slice(1, 7);
  const outcomes = generateOutcomes(activeAgents);
  const simulation = simulateSelection(activeAgents, catalog);

  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {[
          ["Selected", activeAgents.length],
          ["Synergy", simulation.synergyScore],
          ["Coverage", simulation.coverage],
          ["Risk", simulation.aegisRiskScore]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
            <p className="mt-3 font-mono text-3xl text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {outcomes.map((outcome, index) => (
          <motion.article
            key={outcome.title}
            className="glass-surface rounded-[2rem] p-6"
            style={{ "--department-color": index % 2 === 0 ? "#22D3EE" : "#F43F5E" } as CSSProperties}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -8, rotate: index % 2 === 0 ? 0.4 : -0.4 }}
          >
            <div className="glass-content">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-100/70">Outcome {index + 1}</span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">{outcome.title}</h2>
              <p className="mt-4 leading-7 text-slate-300">{outcome.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
