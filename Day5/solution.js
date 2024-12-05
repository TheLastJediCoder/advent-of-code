const fs = require("fs");
const os = require("os");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs
    .readFileSync(filePath, "utf8")
    .split(`${os.EOL}${os.EOL}`)
    .map((d) => d.split(`${os.EOL}`));
  const ruleMap = {};

  let sumOfMiddlePageWithoutFix = 0;
  let sumOfMiddlePageWithFix = 0;

  for (const rule of data[0]) {
    const [left, right] = rule.split("|");

    if (left in ruleMap) {
      ruleMap[left].push(right);
    } else {
      ruleMap[left] = [right];
    }
  }

  for (let i = 0; i < data[1].length; i++) {
    const pages = data[1][i].split(",");

    let isValidWithoutFix = true;

    for (let j = 0; j < pages.length; j++) {
      for (let k = j + 1; k < pages.length; k++) {
        if (pages[k] in ruleMap && ruleMap[pages[k]].includes(pages[j])) {
          isValidWithoutFix = false;
          [pages[k], pages[j]] = [pages[j], pages[k]];
          j -= 1;
          break;
        }
      }
    }

    const middlePage = parseInt(pages[(pages.length - 1) / 2]);

    if (isValidWithoutFix) {
      sumOfMiddlePageWithoutFix += middlePage;
    } else {
      sumOfMiddlePageWithFix += middlePage;
    }
  }

  console.log("Sum of middle page without fix", sumOfMiddlePageWithoutFix);
  console.log("Sum of middle page with fix", sumOfMiddlePageWithFix);
} catch (err) {
  console.error("Error reading the file:", err);
}
