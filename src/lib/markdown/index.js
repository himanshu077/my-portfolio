import ExpenseCalculator from "./expense-calculator.md";
import Bidmii from "./bidmii.md";

export const MarkdownFilesMap = {
  1: Bidmii,
  2: ExpenseCalculator,
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
