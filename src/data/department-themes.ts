import type { CreationPlatform, DepartmentTheme, Platform } from "@/types/catalog";

export const departmentThemes: DepartmentTheme[] = [
  { slug: "zenflow", name: "ZenFlow", code: "ZF", color: "#7C3AED", accent: "#C4B5FD", domain: "AI R&D and central nervous system", visualLanguage: "Neural lattice" },
  { slug: "the-collective", name: "The Collective", code: "TC", color: "#065F46", accent: "#34D399", domain: "Expert AI consulting", visualLanguage: "Executive advisory prism" },
  { slug: "hybrid-living", name: "Hybrid Living", code: "HL", color: "#0EA5E9", accent: "#BAE6FD", domain: "EdTech and AI education", visualLanguage: "Learning constellation" },
  { slug: "nexus-labs", name: "Nexus Labs", code: "NL", color: "#DC2626", accent: "#FCA5A5", domain: "Media and entertainment", visualLanguage: "Cinematic media engine" },
  { slug: "terra-axis", name: "Terra Axis", code: "TA", color: "#7F1D1D", accent: "#F87171", domain: "Real estate and infrastructure", visualLanguage: "Geospatial foundation grid" },
  { slug: "vital-helix", name: "Vital Helix", code: "VH", color: "#14B8A6", accent: "#99F6E4", domain: "Health and neuro-wellness", visualLanguage: "Biometric helix field" },
  { slug: "binary-loom", name: "Binary Loom", code: "BL", color: "#A3E635", accent: "#D9F99D", domain: "Developer tools and infrastructure", visualLanguage: "Code fabric loom" },
  { slug: "quantum-ledger", name: "Quantum Ledger", code: "QL", color: "#8B5CF6", accent: "#DDD6FE", domain: "FinTech and Web3", visualLanguage: "Digital financial architecture" },
  { slug: "kinetic-edge", name: "Kinetic Edge", code: "KE", color: "#16A34A", accent: "#BBF7D0", domain: "Sports and human performance", visualLanguage: "Performance motion trail" },
  { slug: "obsidian-arc", name: "Obsidian Arc", code: "OA", color: "#E2E8F0", accent: "#94A3B8", domain: "Cyber and physical security", visualLanguage: "Dark perimeter shield" },
  { slug: "civic-core", name: "Civic Core", code: "CC", color: "#F4C2C2", accent: "#FFE4E6", domain: "Digital equity nonprofit", visualLanguage: "Civic access halo" },
  { slug: "aether-link", name: "Aether Link", code: "AL", color: "#B5451B", accent: "#FDBA74", domain: "Connectivity and communications", visualLanguage: "Signal mesh aperture" },
  { slug: "gaia-synthesis", name: "Gaia Synthesis", code: "GS", color: "#1A4D2E", accent: "#86EFAC", domain: "AgriTech and environmental engineering", visualLanguage: "Regenerative biosphere" },
  { slug: "vector-shift", name: "Vector Shift", code: "VS", color: "#CBD5E1", accent: "#F8FAFC", domain: "Autonomous logistics and aerial mobility", visualLanguage: "Autonomous route vectors" },
  { slug: "animus-prime", name: "Animus Prime", code: "AP", color: "#22D3EE", accent: "#CFFAFE", domain: "Robotics and humanoid systems", visualLanguage: "Humanoid robotics core" },
  { slug: "juris-guard", name: "Juris Guard", code: "JG", color: "#C9A84C", accent: "#FEF3C7", domain: "LegalTech and AI governance", visualLanguage: "Cybernetic owl" },
  { slug: "signal-velocity", name: "Signal Velocity", code: "SV", color: "#F43F5E", accent: "#FDA4AF", domain: "Growth and performance marketing", visualLanguage: "Broadcast velocity signals" },
  { slug: "nomad-nexus", name: "Nomad Nexus", code: "NN", color: "#92400E", accent: "#FDBA74", domain: "Global mobility infrastructure", visualLanguage: "Borderless mobility compass" },
  { slug: "eon-core", name: "Eon Core", code: "EC", color: "#FFFBEB", accent: "#FDE68A", domain: "Longevity and human optimization", visualLanguage: "Chronobiology light well" },
  { slug: "cognara-mind", name: "Cognara Mind", code: "CM", color: "#E0267E", accent: "#F9A8D4", domain: "Behavioral science and human-AI psychology", visualLanguage: "Cognitive brain architecture" }
];

export const platforms: Platform[] = [
  { id: "ZENFLOW", name: "ZenFlow Zenith OS", description: "Native agent builder with God Prompt, Aegis, routing, and registry controls." },
  { id: "CLAUDE_API", name: "Anthropic Claude API", description: "Claude Sonnet via ZenFlow routing for high-reasoning specialist agents." },
  { id: "N8N", name: "n8n Workflow Automation", description: "Agent nodes, webhook triggers, and integration-driven workflow agents." },
  { id: "OPENAI", name: "OpenAI Assistants API", description: "Assistant creation with tool definitions for structured agent execution." },
  { id: "MAKE", name: "Make.com", description: "Scenario builder, HTTP modules, and AI router automation." },
  { id: "LANGCHAIN", name: "LangChain / LangGraph", description: "Graph agents, memory, tool registries, and multi-step orchestration." },
  { id: "AUTOGEN", name: "Microsoft AutoGen", description: "ConversableAgent and group chat orchestration for collaborative execution." },
  { id: "CUSTOM", name: "Custom FastAPI Microservice", description: "Dockerized service deployed on ZenFlow infrastructure." },
  { id: "UNKNOWN", name: "Unclassified Platform", description: "Imported agent platform has not been normalized yet." }
];

export function platformFromText(value: string): CreationPlatform {
  const text = value.toLowerCase();

  if (text.includes("zenflow")) return "ZENFLOW";
  if (text.includes("anthropic") || text.includes("claude")) return "CLAUDE_API";
  if (text.includes("n8n")) return "N8N";
  if (text.includes("openai") || text.includes("gpt")) return "OPENAI";
  if (text.includes("make.com") || text.includes(" make ")) return "MAKE";
  if (text.includes("langchain") || text.includes("langgraph")) return "LANGCHAIN";
  if (text.includes("autogen")) return "AUTOGEN";
  if (text.includes("fastapi") || text.includes("custom")) return "CUSTOM";

  return "UNKNOWN";
}
