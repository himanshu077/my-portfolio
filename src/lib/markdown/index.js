import ExpenseCalculator from "./expense-calculator.md";
import Bidmii from "./bidmii.md";
import About from "./about.md";
import ChartLock from "./chartlock.md";
import Braverhood from "./braverhood.md";
import SmartContactAI from "./smartcontact-ai.md";
import SnapbackReturns from "./snapback-returns.md";

export const MarkdownFilesMap = {
  1: Bidmii,
  2: ExpenseCalculator,
  3: About,
  chartlock: ChartLock,
  braverhood: Braverhood,
  "smartcontact-ai": SmartContactAI,
  "snapback-returns": SnapbackReturns,
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
