export type AegisLevel = "aegis_clear" | "aegis_review" | "aegis_hold";

export type ElevationLevel = 0 | 1 | 2 | 3 | 4;

export type AgentTier =
  | "Tier 0 - Master Overseer"
  | "Tier 1 - Division Director"
  | "Tier 2 - Specialist Agent"
  | "Tier 3 - Task Agent";

export type CreationPlatform =
  | "ZENFLOW"
  | "CLAUDE_API"
  | "N8N"
  | "OPENAI"
  | "MAKE"
  | "LANGCHAIN"
  | "AUTOGEN"
  | "CUSTOM"
  | "UNKNOWN";

export type DepartmentTheme = {
  slug: string;
  name: string;
  code: string;
  color: string;
  accent: string;
  domain: string;
  visualLanguage: string;
};

export type Tool = {
  id: string;
  name: string;
  category: string;
};

export type Platform = {
  id: CreationPlatform;
  name: string;
  description: string;
};

export type Director = {
  id: string;
  slug: string;
  name: string;
  divisionSlug: string;
  role: string;
  mission: string;
  prompt: string;
  tools: string[];
  platform: CreationPlatform;
  image: string;
};

export type Agent = {
  id: string;
  slug: string;
  name: string;
  divisionSlug: string;
  divisionName: string;
  tier: AgentTier;
  role: string;
  primaryFunction: string;
  mission: string;
  prompt: string;
  tools: string[];
  platforms: CreationPlatform[];
  capabilities: string[];
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  relationships: string[];
  useCases: string[];
  aegisLevel: AegisLevel;
  compatibilityScore: number;
  effectivenessScore: number;
  executionComplexity: number;
  image: string;
};

export type Division = {
  id: string;
  slug: string;
  index: number;
  name: string;
  code: string;
  domain: string;
  description: string;
  theme: DepartmentTheme;
  director: Director;
  agents: Agent[];
  capabilities: string[];
  outputs: string[];
  dependencies: string[];
  image: string;
};

export type SynergyNode = {
  id: string;
  slug: string;
  name: string;
  participatingDivisions: string[];
  useCase: string;
  revenuePhase: string;
  capabilities: string[];
  expectedOutcomes: string[];
  score: number;
};

export type TeamTemplate = {
  id: string;
  name: string;
  goal: string;
  industry: string;
  budget: string;
  complexity: "Low" | "Medium" | "High" | "Enterprise";
  timeline: string;
  agentSlugs: string[];
  directorSlugs: string[];
  synergyNodeSlugs: string[];
  expectedOutcomeScore: number;
};

export type CatalogStats = {
  totalAgents: number;
  totalDirectors: number;
  totalDivisions: number;
  totalSynergyNodes: number;
  totalPlatforms: number;
  totalTools: number;
};

export type AgentCatalog = {
  generatedAt: string;
  overseer: Agent;
  divisions: Division[];
  agents: Agent[];
  directors: Director[];
  tools: Tool[];
  platforms: Platform[];
  synergyNodes: SynergyNode[];
  teamTemplates: TeamTemplate[];
  stats: CatalogStats;
};

export type SimulationResult = {
  coverage: number;
  skillOverlap: number;
  capabilityGaps: string[];
  divisionDiversity: number;
  estimatedEffectiveness: number;
  executionComplexity: number;
  synergyScore: number;
  aegisRiskScore: number;
};
