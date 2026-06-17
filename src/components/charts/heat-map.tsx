import { GlassCard } from "@/components/ui/glass-card";
import type { Division } from "@/types/catalog";

export function HeatMap({ divisions }: { divisions: Division[] }) {
  return (
    <GlassCard color="#22D3EE" elevation={2} className="p-5">
      <div className="mb-5">
        <h2 className="font-display text-xl font-semibold text-white">Department Heat Map</h2>
        <p className="mt-1 text-sm text-slate-400">Agent density, capability surface, and inferred influence.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {divisions.map((division) => {
          const intensity = Math.min(division.agents.length / 30, 1);

          return (
            <div
              key={division.slug}
              className="rounded-2xl border border-white/10 p-3"
              style={{
                background: `linear-gradient(135deg, ${division.theme.color}${Math.round(60 + intensity * 90).toString(16)}, rgba(255,255,255,0.04))`,
                boxShadow: `0 0 ${16 + intensity * 28}px ${division.theme.color}33`
              }}
            >
              <p className="font-mono text-xs text-white/70">{division.code}</p>
              <p className="mt-2 truncate font-display text-sm text-white">{division.name}</p>
              <p className="mt-3 font-mono text-lg text-white">{division.agents.length}</p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
