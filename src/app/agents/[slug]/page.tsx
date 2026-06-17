import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { getAgentBySlug, getCatalog } from "@/data/catalog";
import { isDefined } from "@/lib/utils";

export async function generateStaticParams() {
  return getCatalog().agents.map((agent) => ({ slug: agent.slug }));
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return notFound();
  }

  const catalog = getCatalog();
  const division = catalog.divisions.find((item) => item.slug === agent.divisionSlug);
  const relatedAgents = agent.relationships.map((relatedSlug) => getAgentBySlug(relatedSlug)).filter(isDefined).slice(0, 6);
  const color = division?.theme.color ?? "#7C3AED";

  return (
    <div className="space-y-6">
      <GlassCard color={color} elevation={4} className="p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <Image src={agent.image} alt={`${agent.name} raster illustration`} fill priority className="object-cover" sizes="420px" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-white/10" />
          </div>
          <div>
            <Link href="/agents" className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">
              Directory
            </Link>
            <h1 className="mt-4 font-display text-5xl font-semibold text-white">{agent.name}</h1>
            <p className="mt-3 text-xl text-slate-300">{agent.role}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {[
                ["Division", agent.divisionName],
                ["Tier", agent.tier],
                ["Aegis", agent.aegisLevel],
                ["Compatibility", agent.compatibilityScore]
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm text-white">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl leading-8 text-slate-300">{agent.mission}</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="space-y-6">
          <Panel title="System Prompt" color={color}>
            <p className="whitespace-pre-line leading-8 text-slate-300">{agent.prompt}</p>
          </Panel>
          <Panel title="Capabilities" color={color}>
            <TagList values={agent.capabilities} />
          </Panel>
          <Panel title="Inputs and Outputs" color={color}>
            <div className="grid gap-4 md:grid-cols-2">
              <ListBlock title="Inputs" values={agent.inputs} />
              <ListBlock title="Outputs" values={agent.outputs} />
            </div>
          </Panel>
        </section>

        <aside className="space-y-6">
          <Panel title="Tool Stack" color={color}>
            <TagList values={agent.tools.slice(0, 24)} />
          </Panel>
          <Panel title="Dependencies" color={color}>
            <TagList values={agent.dependencies} />
          </Panel>
          <Panel title="Related Agents" color={color}>
            <div className="space-y-2">
              {relatedAgents.map((related) => (
                <Link key={related.slug} href={`/agents/${related.slug}`} className="block rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-sm text-slate-300 hover:text-white">
                  {related.name}
                </Link>
              ))}
            </div>
          </Panel>
          <Panel title="Recommended Teams" color={color}>
            <div className="space-y-2">
              {catalog.teamTemplates
                .filter((template) => template.agentSlugs.includes(agent.slug))
                .slice(0, 3)
                .map((template) => (
                  <div key={template.id} className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                    <p className="font-display text-sm text-white">{template.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{template.goal}</p>
                  </div>
                ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function Panel({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <GlassCard color={color} elevation={2} className="p-5">
      <h2 className="mb-4 font-display text-2xl font-semibold text-white">{title}</h2>
      {children}
    </GlassCard>
  );
}

function TagList({ values }: { values: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span key={value} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-slate-300">
          {value}
        </span>
      ))}
    </div>
  );
}

function ListBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
      <h3 className="font-display text-lg text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-400">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
