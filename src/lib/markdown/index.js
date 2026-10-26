import ExpenseCalculator from "./expense-calculator.md";
import Bidmii from "./bidmii.md";
import About from "./about.md";
import ChartLock from "./chartlock.md";
import Braverhood from "./braverhood.md";
import SmartContactAI from "./smartcontact-ai.md";
import SnapbackReturns from "./snapback-returns.md";
import Orqestra from "./orqestra.md";
import MultiAgentOrchestrator from "./multi-agent-orchestrator.md";
import ShopAIVoiceAgent from "./shopai-voice-agent.md";
import ElevenLabsVoiceStudio from "./elevenlabs-voice-studio.md";
import N8nProjects from "./n8n-projects.md";
import Parsed from "./parsed.md";
import AiChatbot from "./ai-chatbot.md";
import Solstice from "./solstice.md";
import Pelagic from "./pelagic.md";
import Apex from "./apex.md";
import HyperLiquid from "./hyper-liquid.md";
import Jeemba from "./jeemba.md";
import MvmHealth from "./mvm-health.md";
import MetalPromo from "./metal-promo.md";

export const MarkdownFilesMap = {
  1: Bidmii,
  2: ExpenseCalculator,
  about: About,
  chartlock: ChartLock,
  braverhood: Braverhood,
  "smartcontact-ai": SmartContactAI,
  "snapback-returns": SnapbackReturns,
  orqestra: Orqestra,
  "multi-agent-orchestrator": MultiAgentOrchestrator,
  "shopai-voice-agent": ShopAIVoiceAgent,
  "elevenlabs-voice-studio": ElevenLabsVoiceStudio,
  "n8n-projects": N8nProjects,
  parsed: Parsed,
  "ai-chatbot": AiChatbot,
  solstice: Solstice,
  pelagic: Pelagic,
  apex: Apex,
  "hyper-liquid": HyperLiquid,
  jeemba: Jeemba,
  "mvm-health": MvmHealth,
  "metal-promo": MetalPromo,
};

export const fetchMarkDownFile = (id) => {
  const filePath = MarkdownFilesMap[id];
  if (filePath) {
    return fetch(filePath)
      .then((r) => r.text())
      .then((text) => text);
  } else {
    return Promise.resolve("");
  }
};

/**
 * README of a public GitHub repo, for JSON projects that have no local markdown
 * but link to their source. Resolves to "" when the link is not a GitHub repo
 * or the README cannot be read.
 */
export const fetchGithubReadme = (projectLink = "") => {
  const match = projectLink.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!match) return Promise.resolve("");
  const [, owner, repo] = match;
  const readmeOn = (branch) =>
    fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`).then((r) =>
      r.ok ? r.text() : ""
    );
  return readmeOn("main")
    .then((text) => text || readmeOn("master"))
    .catch(() => "");
};
