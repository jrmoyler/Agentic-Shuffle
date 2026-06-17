"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/search/command-palette";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/agents", label: "Directory" },
  { href: "/divisions", label: "Divisions" },
  { href: "/overseer", label: "Overseer" },
  { href: "/synergy", label: "Synergy" },
  { href: "/builder", label: "Builder" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/team-generator", label: "Generator" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen px-4 py-4 text-slate-100 sm:px-6 lg:px-8">
      <header className="sticky top-4 z-50 mx-auto mb-8 max-w-7xl rounded-full border border-white/10 bg-slate-950/55 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-200/25 bg-cyan-200/10 shadow-[0_0_30px_rgba(34,211,238,0.22)]">
              <span className="h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold tracking-[0.34em] text-white">AGENT SHUFFLE</span>
              <span className="block text-xs text-slate-400">Collective AI lattice</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white",
                  pathname === item.href && "bg-white/12 text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.08)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-200/40 hover:text-white"
          >
            Search <span className="font-mono text-xs text-slate-500">Ctrl K</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl pb-20">{children}</main>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
