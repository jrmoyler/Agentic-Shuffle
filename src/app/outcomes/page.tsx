import { OutcomeEngineClient } from "@/components/outcomes/outcome-engine-client";
import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";

export default function OutcomesPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-8">
      <GlassCard color="#F43F5E" elevation={3} className="p-8">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-rose-100/70">Outcome engine</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">Predict products, services, automations, risks, and revenue opportunities.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          The outcome engine uses the current builder selection when available and falls back to a high-signal launch stack for exploration.
        </p>
      </GlassCard>
      <OutcomeEngineClient catalog={catalog} />
    </div>
  );
}
