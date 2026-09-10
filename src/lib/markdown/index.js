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

export const MarkdownFilesMap = {
  1: Bidmii,
  2: ExpenseCalculator,
  3: About,
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
