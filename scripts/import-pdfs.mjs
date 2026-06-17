import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import zlib from "node:zlib";
import { PDFParse } from "pdf-parse";

const workspaceRoot = process.cwd();
const uploadCandidates = [
  process.env.PDF_UPLOAD_DIR,
  path.join(workspaceRoot, "uploads"),
  path.join(path.dirname(workspaceRoot), "workspace", "uploads"),
  "/home/ubuntu/.cursor/projects/workspace/uploads"
].filter(Boolean);
const uploadsDir = uploadCandidates.find((candidate) =>
  fs.existsSync(path.join(candidate, "Collective_AI_Master_Agent_Roster_FULL_8199.pdf"))
) ?? uploadCandidates[0];
const rosterPdf = path.join(uploadsDir, "Collective_AI_Master_Agent_Roster_FULL_8199.pdf");
const blueprintPdf = path.join(uploadsDir, "CAI_Overseer_Ecosystem_Blueprint_v2_b3f8.pdf");
const generatedDir = path.join(workspaceRoot, "src", "data", "generated");
const publicDir = path.join(workspaceRoot, "public");

const departmentThemes = [
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

const platforms = [
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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeText(value) {
  return value
    .replace(/\r/g, "")
    .replace(/\u0000/g, "")
    .replace(/COLLECTIVE AI INC[^\n]*\n/g, "")
    .replace(/Collective AI Inc\.[^\n]*\n/g, "")
    .replace(/-- \d+ of \d+ --/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function platformFromText(value) {
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

function splitList(value) {
  return value
    .split(/\s*\|\s*|\n|•/g)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => !/^creation platform:?$/i.test(item));
}

function stableScore(seed, min, max) {
  const hash = createHash("sha1").update(seed).digest();
  const value = hash[0] / 255;
  return Math.round(min + value * (max - min));
}

function inferCapabilities(agentName, role, prompt, division) {
  const text = `${agentName} ${role} ${prompt} ${division.domain}`.toLowerCase();
  const capabilities = new Set();
  const dictionary = [
    ["routing", "Intelligent routing"],
    ["audit", "Audit intelligence"],
    ["compliance", "Governance compliance"],
    ["security", "Threat protection"],
    ["data", "Data synthesis"],
    ["market", "Market intelligence"],
    ["client", "Client operations"],
    ["proposal", "Proposal generation"],
    ["training", "Training design"],
    ["memory", "Persistent memory"],
    ["cost", "Cost optimization"],
    ["performance", "Performance analytics"],
    ["workflow", "Workflow automation"],
    ["risk", "Risk analysis"],
    ["research", "Research synthesis"],
    ["content", "Content production"],
    ["finance", "Financial modeling"],
    ["legal", "Legal governance"],
    ["health", "Health intelligence"],
    ["robot", "Robotics orchestration"]
  ];

  for (const [needle, label] of dictionary) {
    if (text.includes(needle)) capabilities.add(label);
  }

  capabilities.add(`${division.name} domain execution`);
  capabilities.add(division.visualLanguage);

  return Array.from(capabilities).slice(0, 6);
}

function inferUseCases(agent, division) {
  return [
    `${division.name} command routing`,
    `${agent.name} specialist deployment`,
    "Cross-division portfolio simulation"
  ];
}

function inferOutputs(role, prompt) {
  const explicitOutput = prompt.match(/Output:\s*([^.\n]+)/i);

  if (explicitOutput) {
    return splitList(explicitOutput[1]).slice(0, 4);
  }

  return [
    "Executive-ready brief",
    "Actionable recommendation",
    "Aegis-classified execution log"
  ];
}

function inferAegisLevel(agentName, role, prompt) {
  const text = `${agentName} ${role} ${prompt}`.toLowerCase();

  if (text.includes("legal") || text.includes("financial") || text.includes("security") || text.includes("health") || text.includes("physical")) {
    return "aegis_review";
  }

  if (text.includes("blocked") || text.includes("irreversible")) {
    return "aegis_hold";
  }

  return "aegis_clear";
}

function parseOverseer(text) {
  const block = text.match(/ZENITH — Collective AI Master Overseer[\s\S]*?CREATION PLATFORM:\n([\s\S]*?)(?=\nDIVISION 01)/);
  const full = block?.[0] ?? "";
  const prompt = full.match(/MASTER SYSTEM PROMPT:\n([\s\S]*?)\nTOOLS:/)?.[1]?.trim() ?? "Coordinates the Collective AI agent lattice.";
  const tools = splitList(full.match(/\nTOOLS:\n([\s\S]*?)\nCREATION PLATFORM:/)?.[1] ?? "ZenFlow Routing API | Agent Health Monitor | Aegis Protocol Engine");

  return {
    id: "agent-zenith",
    slug: "zenith",
    name: "ZENITH",
    divisionSlug: "zenflow",
    divisionName: "ZenFlow",
    tier: "Tier 0 - Master Overseer",
    role: "Collective AI Master Overseer",
    primaryFunction: "Routes, monitors, escalates, and enforces Aegis across the full portfolio.",
    mission: "Operate as the nervous system of the Collective AI ecosystem.",
    prompt,
    tools,
    platforms: ["ZENFLOW"],
    capabilities: ["Portfolio routing", "Aegis governance", "Cross-division orchestration", "Health monitoring", "Escalation management"],
    inputs: ["Incoming requests", "Division health", "Agent telemetry"],
    outputs: ["Routing decisions", "Escalation logs", "Portfolio intelligence briefings"],
    dependencies: ["Division Directors", "Knowledge Keeper", "Aegis Protocol Engine"],
    relationships: ["axis"],
    useCases: ["Portfolio command center", "Escalation authority", "Synergy Node activation"],
    aegisLevel: "aegis_review",
    compatibilityScore: 99,
    effectivenessScore: 98,
    executionComplexity: 88,
    image: "/agents/zenith.png"
  };
}

function parseDivisions(text) {
  const divisions = [];
  const divisionRegex = /DIVISION\s+(\d{2})\s+u\s+([A-Z][A-Z\s&]+[A-Z])\n([\s\S]*?)(?=\nDIVISION\s+\d{2}\s+u\s+|$)/g;
  let match;

  while ((match = divisionRegex.exec(text)) !== null) {
    const index = Number(match[1]);
    const rawName = match[2].replace(/\s+/g, " ").trim();
    const theme = departmentThemes[index - 1] ?? {
      slug: slugify(rawName),
      name: rawName,
      code: rawName.slice(0, 2),
      color: "#7C3AED",
      accent: "#C4B5FD",
      domain: "Imported division",
      visualLanguage: "Imported intelligence field"
    };
    const section = match[3];
    const lines = section.split("\n").map((line) => line.trim()).filter(Boolean);
    const description = lines.find((line) => !line.includes("Division Director") && !line.startsWith("DIRECTOR")) ?? theme.domain;
    const directorLine = section.match(/\n?([A-Z][A-Z0-9 _-]+)\s+—\s+(.+?) Division Director TIER \d+ — DIVISION DIRECTOR/);
    const directorName = directorLine?.[1]?.trim() ?? `${theme.code} Director`;
    const directorRole = directorLine?.[2]?.trim() ?? `${theme.name} Division Director`;
    const directorPrompt = section.match(/DIRECTOR SYSTEM PROMPT:\n([\s\S]*?)\nTOOLS:/)?.[1]?.trim() ?? `You are ${directorName}, Division Director of ${theme.name}.`;
    const directorTools = splitList(section.match(/DIRECTOR SYSTEM PROMPT:[\s\S]*?\nTOOLS:\n([\s\S]*?)\nCREATION PLATFORM:/)?.[1] ?? "ZenFlow Internal API | Agent Registry");
    const directorPlatform = platformFromText(section.match(/DIRECTOR SYSTEM PROMPT:[\s\S]*?CREATION PLATFORM:\n([\s\S]*?)\nTIER 3/)?.[1] ?? "ZenFlow");
    const specialistStart = section.search(/TIER 3 —/);
    const specialistBlock = specialistStart >= 0 ? section.slice(specialistStart) : "";
    const chunks = specialistBlock.split(/\nu\s+/g).slice(1);
    const agents = chunks
      .map((chunk, agentIndex) => parseAgentChunk(chunk, agentIndex, theme))
      .filter(Boolean);
    const directorSlug = slugify(directorName);

    divisions.push({
      id: `division-${theme.slug}`,
      slug: theme.slug,
      index,
      name: theme.name,
      code: theme.code,
      domain: theme.domain,
      description,
      theme,
      director: {
        id: `director-${directorSlug}`,
        slug: directorSlug,
        name: directorName,
        divisionSlug: theme.slug,
        role: directorRole,
        mission: `Govern the ${theme.name} agent cluster and coordinate with ZENITH.`,
        prompt: directorPrompt,
        tools: directorTools,
        platform: directorPlatform,
        image: `/directors/${directorSlug}.png`
      },
      agents,
      capabilities: Array.from(new Set(agents.flatMap((agent) => agent.capabilities))).slice(0, 10),
      outputs: [`${theme.name} intelligence brief`, `${theme.name} execution plan`, "Aegis-classified operating log"],
      dependencies: ["ZENITH", "Knowledge Keeper", "Aegis Protocol Engine"],
      image: `/divisions/${theme.slug}.png`
    });
  }

  return divisions;
}

function parseAgentChunk(chunk, agentIndex, division) {
  const normalized = chunk.replace(/\n{2,}/g, "\n").trim();
  const name = normalized.split("\n")[0]?.trim();

  if (!name || !normalized.includes("ROLE:")) return null;

  const role = normalized.match(/ROLE:\s*([\s\S]*?)\nSYSTEM PROMPT:/)?.[1]?.trim() ?? "Specialist execution agent.";
  const prompt = normalized.match(/SYSTEM PROMPT:\n([\s\S]*?)\nTOOLS:/)?.[1]?.trim() ?? `You are ${name}, a specialist agent in ${division.name}.`;
  const tools = splitList(normalized.match(/\nTOOLS:\n([\s\S]*?)\nCREATION PLATFORM:/)?.[1] ?? "ZenFlow Agent Registry");
  const platformText = normalized.match(/\nCREATION PLATFORM:\n([\s\S]*)/)?.[1]?.trim() ?? "ZenFlow";
  const platform = platformFromText(platformText);
  const slug = slugify(name);
  const capabilities = inferCapabilities(name, role, prompt, division);

  return {
    id: `agent-${division.slug}-${agentIndex + 1}`,
    slug,
    name,
    divisionSlug: division.slug,
    divisionName: division.name,
    tier: "Tier 2 - Specialist Agent",
    role,
    primaryFunction: role.replace(/\s+/g, " ").slice(0, 180),
    mission: `Execute ${division.name} outcomes through ${name.toLowerCase()} capabilities.`,
    prompt,
    tools,
    platforms: [platform],
    capabilities,
    inputs: ["Division request", "Relevant context", "Aegis policy"],
    outputs: inferOutputs(role, prompt),
    dependencies: ["Division Director", "Knowledge Keeper", "Tool Registry"],
    relationships: [],
    useCases: inferUseCases({ name }, division),
    aegisLevel: inferAegisLevel(name, role, prompt),
    compatibilityScore: stableScore(`${division.slug}-${name}-compatibility`, 72, 98),
    effectivenessScore: stableScore(`${division.slug}-${name}-effectiveness`, 70, 97),
    executionComplexity: stableScore(`${division.slug}-${name}-complexity`, 28, 92),
    image: `/agents/${slug}.png`
  };
}

function makeSynergyNodes(divisions, blueprintText) {
  const blueprintLines = blueprintText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /node/i.test(line) && line.length < 140)
    .slice(0, 20);

  return divisions.map((division, index) => {
    const partner = divisions[(index + 1) % divisions.length];
    const secondPartner = divisions[(index + 7) % divisions.length];
    const fallbackName = `${division.name} x ${partner.name} Node`;
    const name = blueprintLines[index]?.replace(/^\d+\.?\s*/, "") ?? fallbackName;

    return {
      id: `node-${index + 1}`,
      slug: `node-${index + 1}-${slugify(name)}`,
      name,
      participatingDivisions: [division.slug, partner.slug, secondPartner.slug],
      useCase: `Coordinate ${division.domain}, ${partner.domain}, and ${secondPartner.domain} into one measurable operating loop.`,
      revenuePhase: `Phase ${Math.floor(index / 5) + 1}`,
      capabilities: Array.from(new Set([...division.capabilities, ...partner.capabilities])).slice(0, 6),
      expectedOutcomes: [
        "Unified multi-division deliverable",
        "Reduced handoff loss",
        "Portfolio-level revenue intelligence"
      ],
      score: stableScore(`${division.slug}-${partner.slug}-node`, 76, 99)
    };
  });
}

function makeTeamTemplates(divisions, synergyNodes) {
  const templates = [
    ["Enterprise Transformation Stack", "Deploy a governed AI transformation pod", "Consulting", "High", "Enterprise", "12-week sprint"],
    ["Marketplace Launch Stack", "Ship a vetted agent product listing", "SaaS", "Medium", "High", "8-week sprint"],
    ["Operational Automation Stack", "Automate intake through executive reporting", "Operations", "Medium", "Medium", "30-day pilot"],
    ["Governance and Risk Stack", "Create a protected operating layer for regulated execution", "Regulated Enterprise", "High", "Enterprise", "60-day rollout"]
  ];

  return templates.map(([name, goal, industry, budget, complexity, timeline], index) => {
    const selectedDivisions = [divisions[index], divisions[index + 1], divisions[index + 6]].filter(Boolean);
    const agentSlugs = selectedDivisions.flatMap((division) => division.agents.slice(0, 3).map((agent) => agent.slug));

    return {
      id: `template-${index + 1}`,
      name,
      goal,
      industry,
      budget,
      complexity,
      timeline,
      agentSlugs,
      directorSlugs: selectedDivisions.map((division) => division.director.slug),
      synergyNodeSlugs: synergyNodes.slice(index, index + 2).map((node) => node.slug),
      expectedOutcomeScore: 88 + index * 2
    };
  });
}

function collectTools(agents, directors) {
  const toolMap = new Map();

  for (const owner of [...agents, ...directors]) {
    for (const toolName of owner.tools) {
      const slug = slugify(toolName);
      if (!toolMap.has(slug)) {
        toolMap.set(slug, {
          id: slug,
          name: toolName,
          category: inferToolCategory(toolName)
        });
      }
    }
  }

  return Array.from(toolMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function inferToolCategory(toolName) {
  const text = toolName.toLowerCase();

  if (text.includes("api") || text.includes("webhook")) return "API";
  if (text.includes("db") || text.includes("database") || text.includes("postgres") || text.includes("vector")) return "Data";
  if (text.includes("dashboard") || text.includes("console")) return "Dashboard";
  if (text.includes("slack") || text.includes("email") || text.includes("message")) return "Communication";
  if (text.includes("model") || text.includes("anthropic") || text.includes("openai") || text.includes("gemini")) return "Model";

  return "Workflow";
}

function enrichRelationships(divisions) {
  for (const division of divisions) {
    const directorSlug = division.director.slug;
    division.agents = division.agents.map((agent, index) => ({
      ...agent,
      relationships: [
        directorSlug,
        division.agents[(index + 1) % division.agents.length]?.slug,
        division.agents[(index + 5) % division.agents.length]?.slug
      ].filter(Boolean)
    }));
  }

  return divisions;
}

function ensureUniqueAgentSlugs(divisions, overseer) {
  const counts = new Map();
  const seen = new Map([[overseer.slug, 1]]);

  for (const agent of [overseer, ...divisions.flatMap((division) => division.agents)]) {
    counts.set(agent.slug, (counts.get(agent.slug) ?? 0) + 1);
  }

  for (const division of divisions) {
    division.agents = division.agents.map((agent) => {
      let slug = agent.slug;

      if ((counts.get(agent.slug) ?? 0) <= 1) {
        const seenCount = seen.get(slug) ?? 0;
        seen.set(slug, seenCount + 1);

        if (seenCount === 0) {
          return agent;
        }
      } else {
        slug = `${division.slug}-${agent.slug}`;
      }

      const seenCount = seen.get(slug) ?? 0;
      seen.set(slug, seenCount + 1);

      if (seenCount > 0) {
        slug = `${slug}-${seenCount + 1}`;
      }

      return {
        ...agent,
        slug,
        image: `/agents/${slug}.png`
      };
    });
  }

  return divisions;
}

function makeCatalog(rosterText, blueprintText) {
  const overseer = parseOverseer(rosterText);
  const divisions = enrichRelationships(ensureUniqueAgentSlugs(parseDivisions(rosterText), overseer));
  const agents = [overseer, ...divisions.flatMap((division) => division.agents)];
  const directors = divisions.map((division) => division.director);
  const synergyNodes = makeSynergyNodes(divisions, blueprintText);
  const tools = collectTools(agents, directors);
  const usedPlatforms = new Set(agents.flatMap((agent) => agent.platforms).concat(directors.map((director) => director.platform)));
  const activePlatforms = platforms.filter((platform) => usedPlatforms.has(platform.id));
  const teamTemplates = makeTeamTemplates(divisions, synergyNodes);

  return {
    generatedAt: new Date().toISOString(),
    overseer,
    divisions,
    agents,
    directors,
    tools,
    platforms: activePlatforms,
    synergyNodes,
    teamTemplates,
    stats: {
      totalAgents: agents.length,
      totalDirectors: directors.length,
      totalDivisions: divisions.length,
      totalSynergyNodes: synergyNodes.length,
      totalPlatforms: activePlatforms.length,
      totalTools: tools.length
    }
  };
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16)
  ];
}

function writePng(filePath, width, height, color, accent, labelSeed) {
  const [r, g, b] = hexToRgb(color);
  const [ar, ag, ab] = hexToRgb(accent);
  const raw = Buffer.alloc((width * 4 + 1) * height);
  const seed = createHash("sha1").update(labelSeed).digest();

  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;

    for (let x = 0; x < width; x += 1) {
      const idx = row + 1 + x * 4;
      const diagonal = (x + y) / (width + height);
      const pulse = Math.sin((x + seed[0]) / 13) * Math.cos((y + seed[1]) / 17);
      const beam = Math.abs(x - width * (0.25 + seed[2] / 512)) < 2 || Math.abs(y - height * (0.7 - seed[3] / 512)) < 2;
      const mix = Math.max(0, Math.min(1, diagonal * 0.65 + pulse * 0.18 + (beam ? 0.45 : 0)));

      raw[idx] = Math.round(r * (1 - mix) + ar * mix);
      raw[idx + 1] = Math.round(g * (1 - mix) + ag * mix);
      raw[idx + 2] = Math.round(b * (1 - mix) + ab * mix);
      raw[idx + 3] = 255;
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const png = Buffer.concat([
    signature,
    pngChunk("IHDR", header),
    pngChunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0))
  ]);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, png);
}

function writeIllustrations(catalog) {
  for (const division of catalog.divisions) {
    writePng(path.join(publicDir, "divisions", `${division.slug}.png`), 640, 420, division.theme.color, division.theme.accent, division.name);
    writePng(path.join(publicDir, "directors", `${division.director.slug}.png`), 480, 480, division.theme.color, division.theme.accent, division.director.name);
  }

  for (const agent of catalog.agents) {
    const division = catalog.divisions.find((item) => item.slug === agent.divisionSlug) ?? catalog.divisions[0];
    writePng(path.join(publicDir, "agents", `${agent.slug}.png`), 320, 240, division.theme.color, division.theme.accent, agent.name);
  }
}

async function readPdf(filePath) {
  const buffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();

  return normalizeText(result.text);
}

async function main() {
  fs.mkdirSync(generatedDir, { recursive: true });
  const rosterText = await readPdf(rosterPdf);
  const blueprintText = fs.existsSync(blueprintPdf) ? await readPdf(blueprintPdf) : "";
  const catalog = makeCatalog(rosterText, blueprintText);

  if (catalog.divisions.length < 20 || catalog.agents.length < 580) {
    throw new Error(`PDF import produced ${catalog.divisions.length} divisions and ${catalog.agents.length} agents; expected 20 divisions and 580+ agents.`);
  }

  fs.writeFileSync(path.join(generatedDir, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);
  writeIllustrations(catalog);
  console.log(`Imported ${catalog.stats.totalAgents} agents, ${catalog.stats.totalTools} tools, and ${catalog.stats.totalSynergyNodes} synergy nodes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
