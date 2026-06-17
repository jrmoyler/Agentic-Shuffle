"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchCatalog } from "@/data/catalog";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCatalog(query), [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-slate-950/70 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/88 shadow-[0_40px_140px_rgba(0,0,0,0.7)]"
            initial={{ y: 28, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-white/10 p-4">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search agents, prompts, divisions, tools, platforms, nodes..."
                className="w-full bg-transparent font-display text-xl text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="premium-scrollbar max-h-[64vh] overflow-y-auto p-4">
              <ResultGroup title="Agents">
                {results.agents.map((agent) => (
                  <Link
                    key={agent.slug}
                    href={`/agents/${agent.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="block rounded-2xl border border-white/8 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
                  >
                    <span className="font-display text-white">{agent.name}</span>
                    <span className="mt-1 block text-sm text-slate-400">{agent.divisionName} - {agent.role}</span>
                  </Link>
                ))}
              </ResultGroup>
              <ResultGroup title="Divisions">
                {results.divisions.map((division) => (
                  <Link
                    key={division.slug}
                    href="/divisions"
                    onClick={() => onOpenChange(false)}
                    className="block rounded-2xl border border-white/8 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
                  >
                    <span className="font-display text-white">{division.name}</span>
                    <span className="mt-1 block text-sm text-slate-400">{division.domain}</span>
                  </Link>
                ))}
              </ResultGroup>
              <ResultGroup title="Synergy Nodes">
                {results.synergyNodes.map((node) => (
                  <Link
                    key={node.slug}
                    href="/synergy"
                    onClick={() => onOpenChange(false)}
                    className="block rounded-2xl border border-white/8 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
                  >
                    <span className="font-display text-white">{node.name}</span>
                    <span className="mt-1 block text-sm text-slate-400">{node.useCase}</span>
                  </Link>
                ))}
              </ResultGroup>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ResultGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-slate-500">{title}</h2>
      <div className="grid gap-2">{children}</div>
    </section>
  );
}
