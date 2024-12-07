const fs = require("fs");
const os = require("os");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs.readFileSync(filePath, "utf8");
  const map = data.split(os.EOL).map((d) => d.split(""));
  const rowCount = map.length;
  const colCount = map[0].length;
  const directions = [
    [-1, 0],
    [0, +1],
    [+1, 0],
    [0, -1],
  ];
  const distinctPositionVisited = new Set();

  function findStartingCoordinate() {
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (map[row][col] === "^") {
          return [row, col];
        }
      }
    }
  }

  function isValidCoordinate(row, col) {
    return 0 <= row && row < rowCount && 0 <= col && col < colCount;
  }

  let [guardRow, guardCol] = findStartingCoordinate();
  let guardDirection = 0;
  let obstacleCount = 0;

  while (isValidCoordinate(guardRow, guardCol)) {
    let [rowInc, colInc] = directions[guardDirection];
    let [nextRow, nextCol] = [guardRow + rowInc, guardCol + colInc];

    if (map[guardRow][guardCol] !== "#") {
      distinctPositionVisited.add(`${guardRow},${guardCol}`);
    }

    if (!isValidCoordinate(nextRow, nextCol)) {
      break;
    }

    if (map[nextRow][nextCol] === "#") {
      guardDirection = (guardDirection + 1) % 4;
      [rowInc, colInc] = directions[guardDirection];
      [nextRow, nextCol] = [guardRow + rowInc, guardCol + colInc];
    }

    [guardRow, guardCol] = [nextRow, nextCol];
  }

  [guardRow, guardCol] = findStartingCoordinate();
  guardDirection = 0;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (map[row][col] !== ".") continue;

      map[row][col] = "#";

      const visitedLocations = new Set();

      let currentRow = guardRow;
      let currentCol = guardCol;
      let currentDirection = guardDirection;

      while (true) {
        const guardState = `${currentRow},${currentCol},${currentDirection}`;

        if (visitedLocations.has(guardState)) {
          obstacleCount++;
          break;
        }

        visitedLocations.add(guardState);

        const nextGuardRow = currentRow + directions[currentDirection][0];
        const nextGuardCol = currentCol + directions[currentDirection][1];

        if (!isValidCoordinate(nextGuardRow, nextGuardCol)) {
          break;
        }

        if (map[nextGuardRow][nextGuardCol] === "#") {
          currentDirection = (currentDirection + 1) % 4;
        } else {
          currentRow = nextGuardRow;
          currentCol = nextGuardCol;
        }
      }

      map[row][col] = ".";
    }
  }

  console.log("Distinct position visited:", distinctPositionVisited.size);
  console.log("Count of Obstacle:", obstacleCount);
} catch (err) {
  console.error("Error reading the file:", err);
}
