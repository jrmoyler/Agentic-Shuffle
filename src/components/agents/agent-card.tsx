import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import type { Agent } from "@/types/catalog";
import { cn } from "@/lib/utils";

type AgentCardProps = {
  agent: Agent;
  color: string;
  view?: "grid" | "masonry" | "kanban" | "table" | "depth";
  selected?: boolean;
  onToggle?: (agent: Agent) => void;
};

export function AgentCard({ agent, color, view = "grid", selected = false, onToggle }: AgentCardProps) {
  const compact = view === "table" || view === "kanban";

  return (
    <GlassCard
      color={color}
      elevation={selected ? 3 : 2}
      className={cn(
        "group h-full p-4",
        view === "depth" && "origin-center rotate-x-2 transform-gpu",
        selected && "ring-2 ring-white/40"
      )}
    >
      <div className={cn("flex gap-4", compact ? "items-center" : "flex-col")}>
        <div className={cn("relative overflow-hidden rounded-3xl border border-white/10 bg-white/5", compact ? "h-20 w-24 shrink-0" : "aspect-[4/3] w-full")}>
          <Image
            src={agent.image}
            alt={`${agent.name} raster illustration`}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes={compact ? "96px" : "(min-width: 1024px) 25vw, 50vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-white/10" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link href={`/agents/${agent.slug}`} className="font-display text-lg font-semibold text-white transition hover:text-cyan-100">
                {agent.name}
              </Link>
              <p className="mt-1 truncate text-sm text-slate-400">{agent.divisionName}</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 font-mono text-xs text-slate-300">{agent.compatibilityScore}</span>
          </div>
          {!compact ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{agent.primaryFunction}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-slate-300">{agent.aegisLevel}</span>
            <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-slate-300">{agent.tools.length} tools</span>
            <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-slate-300">{agent.useCases.length} use cases</span>
          </div>
          {onToggle ? (
            <button
              type="button"
              onClick={() => onToggle(agent)}
              className="mt-4 w-full rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white transition hover:border-white/30"
            >
              {selected ? "Remove from workspace" : "Add to shuffle"}
            </button>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
}
