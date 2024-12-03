const fs = require("fs");
const os = require("os");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs.readFileSync(filePath, "utf8");

  let safeReportsCount = 0;
  let safeReportsCountWithSingleBadLevel = 0;

  const reports = [];

  function isSafeReport(report) {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 0; i < report.length - 1; i++) {
      const increasingDifference = report[i + 1] - report[i];
      const decreasingDifference = report[i] - report[i + 1];

      if (increasingDifference < 1 || increasingDifference > 3) {
        isIncreasing = false;
      }

      if (decreasingDifference < 1 || decreasingDifference > 3) {
        isDecreasing = false;
      }
    }

    return isIncreasing || isDecreasing;
  }

  for (let line of data.split(os.EOL)) {
    const report = line.split(" ").map((level) => parseInt(level));

    if (isSafeReport(report)) {
      safeReportsCount += 1;
      safeReportsCountWithSingleBadLevel += 1;
    } else {
      for (let i = 0; i < report.length; i++) {
        if (isSafeReport([...report.slice(0, i), ...report.slice(i + 1)])) {
          safeReportsCountWithSingleBadLevel += 1;
          break;
        }
      }
    }
  }

  console.log("Safe Reports:", safeReportsCount);
  console.log(
    "Safe Reports With Single Bad Level:",
    safeReportsCountWithSingleBadLevel
  );
} catch (err) {
  console.error("Error reading the file:", err);
}
