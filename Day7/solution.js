const fs = require("fs");
const os = require("os");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs.readFileSync(filePath, "utf8").split(os.EOL);

  function calibrateEquation(target, numbers, currentIndex, currentValue) {
    if (target < currentValue) return false;

    if (currentIndex >= numbers.length - 1) {
      return target === currentValue;
    }

    const nextIndex = currentIndex + 1;
    
    const sum = currentValue + numbers[nextIndex];
    const mul = currentValue * numbers[nextIndex];
    const concate = parseInt(`${currentValue}${numbers[nextIndex]}`);
    
    const sumOP = calibrateEquation(target, numbers, nextIndex, sum);
    const mulOP = calibrateEquation(target, numbers, nextIndex, mul);
    const concateOP = calibrateEquation(target, numbers, nextIndex, concate);

    // return sumOP || mulOP; // Part 1
    return sumOP || mulOP || concateOP;
  }

  let calibrationResult = 0;

  for (const line of data) {
    const [value, number] = line.split(":");
    const numbers = number
      .trim()
      .split(" ")
      .map((n) => parseInt(n));

    if (calibrateEquation(parseInt(value), numbers, 0, numbers[0])) {
      calibrationResult += parseInt(value);
    }
  }

  console.log("Calibration result", calibrationResult);
} catch (err) {
  console.error("Error reading the file:", err);
}
