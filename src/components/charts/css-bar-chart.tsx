import { GlassCard } from "@/components/ui/glass-card";
import { formatNumber } from "@/lib/utils";

type ChartDatum = {
  label: string;
  value: number;
  color?: string;
};

type CssBarChartProps = {
  title: string;
  subtitle?: string;
  data: ChartDatum[];
  color?: string;
  maxItems?: number;
};

export function CssBarChart({ title, subtitle, data, color = "#7C3AED", maxItems = 10 }: CssBarChartProps) {
  const visibleData = data.slice(0, maxItems);
  const max = Math.max(...visibleData.map((datum) => datum.value), 1);

  return (
    <GlassCard color={color} elevation={2} className="p-5">
      <div className="mb-5">
        <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      <div className="space-y-3">
        {visibleData.map((datum) => (
          <div key={datum.label}>
            <div className="mb-1 flex items-center justify-between gap-4 text-sm">
              <span className="truncate text-slate-300">{datum.label}</span>
              <span className="font-mono text-slate-400">{formatNumber(datum.value)}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full shadow-[0_0_20px_currentColor]"
                style={{
                  width: `${Math.max((datum.value / max) * 100, 4)}%`,
                  background: `linear-gradient(90deg, ${datum.color ?? color}, rgba(255,255,255,0.78))`,
                  color: datum.color ?? color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
