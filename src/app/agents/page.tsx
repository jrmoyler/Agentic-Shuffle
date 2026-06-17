import { AgentDirectoryClient } from "@/components/agents/agent-directory-client";
import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";

export default function AgentDirectoryPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-8">
      <GlassCard color="#0EA5E9" elevation={3} className="p-8">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/70">Agent directory</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">Search, filter, sort, group, and compare every agent.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Grid, masonry, kanban, table, and 3D card views share the same premium floating card system and department glow inheritance.
        </p>
      </GlassCard>
      <AgentDirectoryClient agents={catalog.agents} divisions={catalog.divisions} />
    </div>
  );
}
