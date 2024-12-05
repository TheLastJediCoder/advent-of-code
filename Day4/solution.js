const fs = require("fs");
const os = require("os");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs.readFileSync(filePath, "utf8");
  const matrix = data.split(os.EOL).map((d) => d.split(""));

  function isValidCoordinate(coordinate) {
    return (
      0 <= coordinate[0] &&
      coordinate[0] < matrix.length &&
      0 <= coordinate[1] &&
      coordinate[1] < matrix.length
    );
  }

  function findXmas(row, col, sequence, rowInc, colInc) {
    if (sequence === "XMAS") {
      return 1;
    }

    if (sequence.length === 4) return 0;

    row += rowInc;
    col += colInc;

    if (isValidCoordinate([row, col])) {
      return findXmas(row, col, sequence + matrix[row][col], rowInc, colInc);
    }

    return 0;
  }

  function findMas(row, col, sequence, rowInc, colInc) {
    if (sequence === "MAS" || sequence === "SAM") {
      return 1;
    }

    if (sequence.length === 3) return 0;

    row += rowInc;
    col += colInc;

    if (isValidCoordinate([row, col])) {
      return findMas(row, col, sequence + matrix[row][col], rowInc, colInc);
    }

    return 0;
  }

  let xmasCount = 0;
  let masCount = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[row][col] === "X") {
        xmasCount += findXmas(row, col, "X", -1, -1);
        xmasCount += findXmas(row, col, "X", -1, 0);
        xmasCount += findXmas(row, col, "X", -1, +1);
        xmasCount += findXmas(row, col, "X", 0, -1);
        xmasCount += findXmas(row, col, "X", 0, +1);
        xmasCount += findXmas(row, col, "X", +1, -1);
        xmasCount += findXmas(row, col, "X", +1, 0);
        xmasCount += findXmas(row, col, "X", +1, +1);
      }

      if (matrix[row][col] === "A") {
        const topLeft = [row - 1, col - 1];
        const topRight = [row - 1, col + 1];

        if (!isValidCoordinate(topLeft)) continue;
        if (!isValidCoordinate(topRight)) continue;

        if (
          !findMas(
            topLeft[0],
            topLeft[1],
            matrix[topLeft[0]][topLeft[1]],
            +1,
            +1
          )
        )
          continue;

        if (
          !findMas(
            topRight[0],
            topRight[1],
            matrix[topRight[0]][topRight[1]],
            +1,
            -1
          )
        )
          continue;

        masCount += 1;
      }
    }
  }

  console.log("X-MAS count:", xmasCount);
  console.log("MAS count:", masCount);
} catch (err) {
  console.error("Error reading the file:", err);
}
