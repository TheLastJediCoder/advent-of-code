const fs = require('fs');

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs.readFileSync(filePath, "utf8");
  const leftArray = [];
  const rightArray = [];

  for (const line of data.trim().split("\r\n")) {
    const [left, right] = line.split("   ");
    leftArray.push(parseInt(left));
    rightArray.push(parseInt(right));
  }

  leftArray.sort();
  rightArray.sort();

  let totalDistance = 0;

  for (let i = 0; i < leftArray.length; i++) {
    totalDistance += Math.abs(leftArray[i] - rightArray[i]);
  }

  console.log("Total Distance:", totalDistance);

  let rightIndex = 0;

  let similarityScore = 0;

  for (let i = 0; i < leftArray.length; i++) {
    while (leftArray[i] > rightArray[rightIndex]) {
      rightIndex += 1;
    }

    let rightOccurrence = 0;

    while (leftArray[i] === rightArray[rightIndex]) {
      rightOccurrence += 1;
      rightIndex += 1;
    }

    let leftOccurance = 1;

    while (i < leftArray.length && leftArray[i] === leftArray[i + 1]) {
      leftOccurance += 1;
      i += 1;
    }

    similarityScore += leftArray[i] * rightOccurrence * leftOccurance;
  }

  console.log("Similarity Score:", similarityScore);
} catch (err) {
  console.error("Error reading the file:", err);
}
