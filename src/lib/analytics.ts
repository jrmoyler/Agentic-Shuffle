import type { Agent, AgentCatalog, SimulationResult, TeamTemplate } from "@/types/catalog";
import { clamp } from "@/lib/utils";

export function getAgentsByDivision(catalog: AgentCatalog) {
  return catalog.divisions.map((division) => ({
    label: division.name,
    value: division.agents.length,
    color: division.theme.color
  }));
}

export function getAgentsByTier(catalog: AgentCatalog) {
  const counts = new Map<string, number>();

  for (const agent of catalog.agents) {
    counts.set(agent.tier, (counts.get(agent.tier) ?? 0) + 1);
  }

  return Array.from(counts, ([label, value]) => ({ label, value }));
}

export function getAgentsByPlatform(catalog: AgentCatalog) {
  const counts = new Map<string, number>();

  for (const agent of catalog.agents) {
    for (const platform of agent.platforms) {
      counts.set(platform, (counts.get(platform) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

export function getCapabilityDensity(agents: Agent[]) {
  const density = new Map<string, number>();

  for (const agent of agents) {
    for (const capability of agent.capabilities) {
      density.set(capability, (density.get(capability) ?? 0) + 1);
    }
  }

  return Array.from(density, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

export function simulateSelection(selectedAgents: Agent[], catalog: AgentCatalog): SimulationResult {
  if (selectedAgents.length === 0) {
    return {
      coverage: 0,
      skillOverlap: 0,
      capabilityGaps: ["Select agents to calculate portfolio coverage."],
      divisionDiversity: 0,
      estimatedEffectiveness: 0,
      executionComplexity: 0,
      synergyScore: 0,
      aegisRiskScore: 0
    };
  }

  const selectedCapabilities = selectedAgents.flatMap((agent) => agent.capabilities);
  const uniqueCapabilities = new Set(selectedCapabilities);
  const allCapabilities = new Set(catalog.agents.flatMap((agent) => agent.capabilities));
  const selectedDivisions = new Set(selectedAgents.map((agent) => agent.divisionSlug));
  const reviewRisk = selectedAgents.filter((agent) => agent.aegisLevel !== "aegis_clear").length;
  const overlap = selectedCapabilities.length - uniqueCapabilities.size;
  const gaps = Array.from(allCapabilities)
    .filter((capability) => !uniqueCapabilities.has(capability))
    .slice(0, 6);

  const coverage = Math.round((uniqueCapabilities.size / Math.max(allCapabilities.size, 1)) * 100);
  const divisionDiversity = Math.round((selectedDivisions.size / catalog.divisions.length) * 100);
  const estimatedEffectiveness = Math.round(
    selectedAgents.reduce((total, agent) => total + agent.effectivenessScore, 0) / selectedAgents.length
  );
  const executionComplexity = Math.round(
    selectedAgents.reduce((total, agent) => total + agent.executionComplexity, 0) / selectedAgents.length
  );
  const synergyScore = clamp(Math.round((coverage * 0.42 + divisionDiversity * 0.28 + estimatedEffectiveness * 0.3) - overlap * 1.5), 0, 100);
  const aegisRiskScore = clamp(Math.round((reviewRisk / selectedAgents.length) * 100 + executionComplexity * 0.18), 0, 100);

  return {
    coverage,
    skillOverlap: clamp(Math.round((overlap / Math.max(selectedCapabilities.length, 1)) * 100), 0, 100),
    capabilityGaps: gaps.length > 0 ? gaps : ["No major capability gaps detected."],
    divisionDiversity,
    estimatedEffectiveness,
    executionComplexity,
    synergyScore,
    aegisRiskScore
  };
}

export function generateOutcomes(selectedAgents: Agent[]) {
  const names = selectedAgents.map((agent) => agent.name).slice(0, 4).join(", ");
  const divisions = Array.from(new Set(selectedAgents.map((agent) => agent.divisionName))).join(" + ");
  const capabilitySet = new Set(selectedAgents.flatMap((agent) => agent.capabilities));
  const capabilities = Array.from(capabilitySet).slice(0, 5);

  return [
    {
      title: "Potential products",
      body: `${names || "Selected agents"} can form a product pod across ${divisions || "multiple divisions"} to ship capability modules around ${capabilities.join(", ") || "portfolio intelligence"}.`
    },
    {
      title: "Potential services",
      body: "Package the selected stack as a managed enterprise agent team with onboarding, measurement, governance, and monthly optimization."
    },
    {
      title: "Potential automations",
      body: "Automate intake, routing, prompt assembly, tool execution, QA review, and executive summary delivery through ZenFlow escalation rules."
    },
    {
      title: "Revenue opportunities",
      body: "Prioritize recurring subscriptions, implementation retainers, marketplace listings, and premium outcome simulations for high-fit customers."
    },
    {
      title: "Risks and blind spots",
      body: "Watch tool overlap, ambiguous ownership between divisions, Aegis review load, and missing data freshness checks before production rollout."
    }
  ];
}

export function recommendTemplate(catalog: AgentCatalog, filters: Partial<TeamTemplate>) {
  const templates = catalog.teamTemplates;

  return templates
    .map((template) => {
      const industryMatch = filters.industry && template.industry.toLowerCase().includes(filters.industry.toLowerCase()) ? 12 : 0;
      const complexityMatch = filters.complexity === template.complexity ? 10 : 0;
      const budgetMatch = filters.budget && template.budget.toLowerCase().includes(filters.budget.toLowerCase()) ? 8 : 0;

      return {
        ...template,
        matchScore: clamp(template.expectedOutcomeScore + industryMatch + complexityMatch + budgetMatch, 0, 100)
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
