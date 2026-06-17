import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { getCatalog } from "@/data/catalog";

export default function DivisionExplorerPage() {
  const catalog = getCatalog();

  return (
    <div className="space-y-8">
      <GlassCard color="#CBD5E1" elevation={3} className="p-8">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-400">Division explorer</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">20 divisions, 20 directors, 600 specialist agents.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Each division card exposes director authority, capabilities, outputs, dependencies, and relationship density.</p>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-2">
        {catalog.divisions.map((division) => (
          <GlassCard key={division.slug} color={division.theme.color} elevation={2} className="p-5">
            <div className="grid gap-5 md:grid-cols-[180px_1fr]">
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
                <Image src={division.image} alt={`${division.name} raster illustration`} fill className="object-cover" sizes="180px" />
              </div>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">{division.code}</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-white">{division.name}</h2>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-sm text-white">{division.agents.length}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{division.description}</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Director</p>
                  <p className="mt-2 font-display text-lg text-white">{division.director.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{division.director.role}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <MiniList title="Capabilities" values={division.capabilities.slice(0, 5)} />
              <MiniList title="Outputs" values={division.outputs} />
              <MiniList title="Dependencies" values={division.dependencies} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {division.agents.slice(0, 8).map((agent) => (
                <Link key={agent.slug} href={`/agents/${agent.slug}`} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300 hover:text-white">
                  {agent.name}
                </Link>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function MiniList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-400">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
