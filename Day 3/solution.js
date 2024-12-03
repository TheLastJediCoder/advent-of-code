const fs = require("fs");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";
// const filePath = "./test-input2.txt";

try {
  const data = fs.readFileSync(filePath, "utf8");

  let sumOfMultiplication = 0;
  let sumOfMultiplicationWithEnabled = 0;
  let isMultiplicationEnabled = true;

  for (let i = 0; i < data.length; i++) {
    if (data.slice(i, i + 7) === "don't()") {
      i += 6;

      isMultiplicationEnabled = false;
      continue;
    }

    if (data.slice(i, i + 4) === "do()") {
      i += 3;

      isMultiplicationEnabled = true;
      continue;
    }

    if (data[i] !== "m") continue;

    if (data.slice(i, i + 3) !== "mul") continue;

    i += 3;

    if (data[i] !== "(") continue;

    i += 1;

    let j = i;

    while (data[j] == 0 || parseInt(data[j])) {
      j++;
    }

    if (i === j || j - i > 3) continue;

    const firstNumber = parseInt(data.slice(i, j));

    i = j;

    if (data[i] !== ",") continue;

    i += 1;
    j = i;

    while (data[j] == 0 || parseInt(data[j])) {
      j++;
    }

    if (i === j || j - i > 3) continue;

    const secondNumber = parseInt(data.slice(i, j));

    i = j;

    if (data[i] !== ")") continue;

    sumOfMultiplication += firstNumber * secondNumber;

    if (isMultiplicationEnabled) {
      sumOfMultiplicationWithEnabled += firstNumber * secondNumber;
    }
  }

  console.log("Sum of Multiplication:", sumOfMultiplication);
  console.log(
    "Sum of Multiplication with enable condition:",
    sumOfMultiplicationWithEnabled
  );
} catch (err) {
  console.error("Error reading the file:", err);
}
