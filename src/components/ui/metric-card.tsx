import { GlassCard } from "@/components/ui/glass-card";
import { formatNumber } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: number;
  detail: string;
  color?: string;
};

export function MetricCard({ label, value, detail, color = "#7C3AED" }: MetricCardProps) {
  return (
    <GlassCard color={color} elevation={2} className="p-5">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="font-mono text-4xl font-semibold text-white">{formatNumber(value)}</p>
        <span className="h-2 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      </div>
      <p className="mt-4 text-sm text-slate-400">{detail}</p>
    </GlassCard>
  );
}
