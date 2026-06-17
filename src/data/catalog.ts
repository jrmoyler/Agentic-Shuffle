import rawCatalog from "@/data/generated/catalog.json";
import type { Agent, AgentCatalog, Division } from "@/types/catalog";

export const catalog = rawCatalog as AgentCatalog;

export function getCatalog() {
  return catalog;
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return catalog.agents.find((agent) => agent.slug === slug);
}

export function getDivisionBySlug(slug: string): Division | undefined {
  return catalog.divisions.find((division) => division.slug === slug);
}

export function searchCatalog(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return {
      agents: catalog.agents.slice(0, 12),
      divisions: catalog.divisions.slice(0, 6),
      synergyNodes: catalog.synergyNodes.slice(0, 6)
    };
  }

  return {
    agents: catalog.agents
      .filter((agent) =>
        [
          agent.name,
          agent.role,
          agent.divisionName,
          agent.prompt,
          agent.capabilities.join(" "),
          agent.tools.join(" "),
          agent.useCases.join(" ")
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 24),
    divisions: catalog.divisions
      .filter((division) => [division.name, division.domain, division.description, division.capabilities.join(" ")].join(" ").toLowerCase().includes(normalized))
      .slice(0, 8),
    synergyNodes: catalog.synergyNodes
      .filter((node) => [node.name, node.useCase, node.capabilities.join(" "), node.expectedOutcomes.join(" ")].join(" ").toLowerCase().includes(normalized))
      .slice(0, 8)
  };
}
