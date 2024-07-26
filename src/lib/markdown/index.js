import ExpenseCalculatorMD from "./expense-calculator.md";
import BidmiiMD from "./bidmii.md";

export const MarkdownFilesMap = {
  1: BidmiiMD,
  2: ExpenseCalculatorMD,
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
