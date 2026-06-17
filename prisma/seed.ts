import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { catalog } from "../src/data/catalog";
import { slugify } from "../src/lib/utils";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db"
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.savedBuildAgent.deleteMany();
  await prisma.savedBuild.deleteMany();
  await prisma.teamTemplateSynergyNode.deleteMany();
  await prisma.teamTemplateAgent.deleteMany();
  await prisma.teamTemplate.deleteMany();
  await prisma.synergyNodeDepartment.deleteMany();
  await prisma.synergyNode.deleteMany();
  await prisma.agentRelationship.deleteMany();
  await prisma.agentMetric.deleteMany();
  await prisma.agentStat.deleteMany();
  await prisma.agentPlatform.deleteMany();
  await prisma.agentTool.deleteMany();
  await prisma.directorTool.deleteMany();
  await prisma.director.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.department.deleteMany();
  await prisma.platform.deleteMany();

  await prisma.platform.createMany({
    data: catalog.platforms.map((platform) => ({
      id: platform.id,
      name: platform.name,
      description: platform.description
    }))
  });

  const departmentIds = new Map<string, string>();
  const agentIds = new Map<string, string>();
  const toolIds = new Map<string, string>();
  const synergyNodeIds = new Map<string, string>();
  const templateIds = new Map<string, string>();

  for (const tool of catalog.tools) {
    const created = await prisma.tool.create({
      data: {
        slug: tool.id,
        name: tool.name,
        category: tool.category
      }
    });
    toolIds.set(tool.name, created.id);
  }

  for (const division of catalog.divisions) {
    const createdDepartment = await prisma.department.create({
      data: {
        slug: division.slug,
        name: division.name,
        code: division.code,
        domain: division.domain,
        description: division.description,
        color: division.theme.color,
        accent: division.theme.accent,
        visualSystem: division.theme.visualLanguage,
        image: division.image
      }
    });
    departmentIds.set(division.slug, createdDepartment.id);

    const createdDirector = await prisma.director.create({
      data: {
        slug: division.director.slug,
        name: division.director.name,
        role: division.director.role,
        mission: division.director.mission,
        prompt: division.director.prompt,
        image: division.director.image,
        departmentId: createdDepartment.id,
        platformId: division.director.platform === "UNKNOWN" ? undefined : division.director.platform
      }
    });

    for (const toolName of division.director.tools) {
      const toolId = toolIds.get(toolName);
      if (toolId) {
        await prisma.directorTool.create({
          data: {
            directorId: createdDirector.id,
            toolId
          }
        });
      }
    }
  }

  for (const agent of catalog.agents) {
    const departmentId = departmentIds.get(agent.divisionSlug) ?? departmentIds.get("zenflow");
    if (!departmentId) continue;

    const createdAgent = await prisma.agent.create({
      data: {
        slug: agent.slug,
        name: agent.name,
        tier: agent.tier,
        role: agent.role,
        primaryFunction: agent.primaryFunction,
        mission: agent.mission,
        prompt: agent.prompt,
        inputs: JSON.stringify(agent.inputs),
        outputs: JSON.stringify(agent.outputs),
        dependencies: JSON.stringify(agent.dependencies),
        useCases: JSON.stringify(agent.useCases),
        capabilities: JSON.stringify(agent.capabilities),
        aegisLevel: agent.aegisLevel,
        compatibilityScore: agent.compatibilityScore,
        effectivenessScore: agent.effectivenessScore,
        executionComplexity: agent.executionComplexity,
        image: agent.image,
        departmentId
      }
    });
    agentIds.set(agent.slug, createdAgent.id);

    await prisma.agentMetric.create({
      data: {
        agentId: createdAgent.id,
        compatibilityScore: agent.compatibilityScore,
        effectivenessScore: agent.effectivenessScore,
        executionComplexity: agent.executionComplexity,
        qualityScore: Math.min(agent.effectivenessScore + 2, 100),
        latencyScore: Math.max(100 - agent.executionComplexity, 20),
        costScore: Math.max(100 - Math.round(agent.tools.length * 1.4), 15)
      }
    });

    await prisma.agentStat.create({
      data: {
        agentId: createdAgent.id,
        departmentId,
        selectionFrequency: agent.compatibilityScore * 3,
        successRate: agent.effectivenessScore,
        revenueInfluence: Math.round((agent.compatibilityScore + agent.effectivenessScore) / 2),
        riskLoad: agent.aegisLevel === "aegis_clear" ? 18 : 56
      }
    });

    for (const platformId of agent.platforms.filter((platform) => platform !== "UNKNOWN")) {
      await prisma.agentPlatform.create({
        data: {
          agentId: createdAgent.id,
          platformId
        }
      });
    }

    for (const toolName of agent.tools) {
      const toolId = toolIds.get(toolName);
      if (toolId) {
        await prisma.agentTool.create({
          data: {
            agentId: createdAgent.id,
            toolId
          }
        });
      }
    }
  }

  for (const agent of catalog.agents) {
    const fromAgentId = agentIds.get(agent.slug);
    if (!fromAgentId) continue;

    for (const relatedSlug of agent.relationships.slice(0, 3)) {
      const toAgentId = agentIds.get(relatedSlug);
      if (!toAgentId || toAgentId === fromAgentId) continue;

      await prisma.agentRelationship.upsert({
        where: {
          fromAgentId_toAgentId_type: {
            fromAgentId,
            toAgentId,
            type: "collaborates_with"
          }
        },
        update: {},
        create: {
          fromAgentId,
          toAgentId,
          type: "collaborates_with",
          strength: 78,
          description: "Generated from roster adjacency and division governance relationships."
        }
      });
    }
  }

  for (const node of catalog.synergyNodes) {
    const created = await prisma.synergyNode.create({
      data: {
        slug: node.slug,
        name: node.name,
        useCase: node.useCase,
        revenuePhase: node.revenuePhase,
        capabilities: JSON.stringify(node.capabilities),
        expectedOutcomes: JSON.stringify(node.expectedOutcomes),
        score: node.score
      }
    });
    synergyNodeIds.set(node.slug, created.id);

    for (const divisionSlug of node.participatingDivisions) {
      const departmentId = departmentIds.get(divisionSlug);
      if (departmentId) {
        await prisma.synergyNodeDepartment.create({
          data: {
            synergyNodeId: created.id,
            departmentId
          }
        });
      }
    }
  }

  for (const template of catalog.teamTemplates) {
    const created = await prisma.teamTemplate.create({
      data: {
        slug: slugify(template.name),
        name: template.name,
        goal: template.goal,
        industry: template.industry,
        budget: template.budget,
        complexity: template.complexity,
        timeline: template.timeline,
        expectedOutcomeScore: template.expectedOutcomeScore
      }
    });
    templateIds.set(template.id, created.id);

    for (const agentSlug of template.agentSlugs) {
      const agentId = agentIds.get(agentSlug);
      if (agentId) {
        await prisma.teamTemplateAgent.create({
          data: {
            templateId: created.id,
            agentId
          }
        });
      }
    }

    for (const nodeSlug of template.synergyNodeSlugs) {
      const synergyNodeId = synergyNodeIds.get(nodeSlug);
      if (synergyNodeId) {
        await prisma.teamTemplateSynergyNode.create({
          data: {
            templateId: created.id,
            synergyNodeId
          }
        });
      }
    }
  }

  console.log(`Seeded ${agentIds.size} agents, ${departmentIds.size} departments, ${toolIds.size} tools, ${templateIds.size} team templates.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
