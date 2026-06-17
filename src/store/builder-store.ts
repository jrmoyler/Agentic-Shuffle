"use client";

import { create } from "zustand";
import type { Agent } from "@/types/catalog";

type BuilderState = {
  selected: Agent[];
  addAgent: (agent: Agent) => void;
  removeAgent: (slug: string) => void;
  toggleAgent: (agent: Agent) => void;
  clear: () => void;
};

export const useBuilderStore = create<BuilderState>((set) => ({
  selected: [],
  addAgent: (agent) =>
    set((state) => ({
      selected: state.selected.some((item) => item.slug === agent.slug) ? state.selected : [...state.selected, agent]
    })),
  removeAgent: (slug) =>
    set((state) => ({
      selected: state.selected.filter((agent) => agent.slug !== slug)
    })),
  toggleAgent: (agent) =>
    set((state) => ({
      selected: state.selected.some((item) => item.slug === agent.slug)
        ? state.selected.filter((item) => item.slug !== agent.slug)
        : [...state.selected, agent]
    })),
  clear: () => set({ selected: [] })
}));
