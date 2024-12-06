const fs = require("fs");
const os = require("os");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs.readFileSync(filePath, "utf8");
  const map = data.split(os.EOL).map((d) => d.split(""));
  const rowCount = map.length;
  const colCount = map[0].length;

  const directionIncrement = {
    U: [-1, 0], // Up
    R: [0, 1], // Right
    D: [1, 0], // Down
    L: [0, -1], // Left
  };

  function nextDirectionPatrol(coordinate, direction) {
    switch (direction) {
      case "U":
        return patrol([coordinate[0] + 1, coordinate[1]], "R");
      case "R":
        return patrol([coordinate[0], coordinate[1] - 1], "D");
      case "D":
        return patrol([coordinate[0] - 1, coordinate[1]], "L");
      case "L":
        return patrol([coordinate[0], coordinate[1] + 1], "U");
    }

    return [0, 0];
  }

  function nextDirectionLoop(coordinate, nextCoordinate, direction) {
    switch (direction) {
      case "U":
        return findLoop(coordinate, [nextCoordinate[0] + 1, nextCoordinate[1]], direction);
      case "R":
        return findLoop(coordinate, [nextCoordinate[0], nextCoordinate[1] - 1], direction);
      case "D":
        return findLoop(coordinate, [nextCoordinate[0] - 1, nextCoordinate[1]], direction);
      case "L":
        return findLoop(coordinate, [nextCoordinate[0], nextCoordinate[1] + 1], direction);
    }

    return 0;
  }

  function findStartingCoordinate() {
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (map[row][col] === "^") {
          return [row, col];
        }
      }
    }

    return [0, 0];
  }

  function isValidCoordinate(coordinate) {
    return (
      0 <= coordinate[0] &&
      coordinate[0] < rowCount &&
      0 <= coordinate[1] &&
      coordinate[1] < colCount
    );
  }

  function findLoop(startCoordinate, nextCoordinate, currentDirection, counter = 1) {
    if (currentDirection === 'U') {
      currentDirection = 'R';
    } else if (currentDirection === 'R') {
      currentDirection = 'D'
    } else if (currentDirection === 'D') {
      currentDirection = 'L';
    } else if (currentDirection === 'L') {
      currentDirection = 'U';
    }

    const rowInc = directionIncrement[currentDirection][0];
    const colInc = directionIncrement[currentDirection][1];

    while (
      isValidCoordinate(nextCoordinate) &&
      map[nextCoordinate[0]][nextCoordinate[1]] !== "#"
    ) {
      console.log(nextCoordinate);
      nextCoordinate = [nextCoordinate[0] + rowInc, nextCoordinate[1] + colInc];
      if (startCoordinate[0] === nextCoordinate[0] && startCoordinate[1] === nextCoordinate[1]) {
        return 1;
      }
    }

    if (!isValidCoordinate(nextCoordinate))
      return 0;

    return nextDirectionLoop(startCoordinate, nextCoordinate, currentDirection);
  }

  function patrol(coordinate = [0, 0], currentDirection) {
    let distinctPositionCount = 0;
    let obstructionCount = 0;

    const rowInc = directionIncrement[currentDirection][0];
    const colInc = directionIncrement[currentDirection][1];

    while (
      isValidCoordinate(coordinate) &&
      map[coordinate[0]][coordinate[1]] !== "#"
    ) {
      const char = map[coordinate[0]][coordinate[1]];

      if (char === "." || char === "^") {
        distinctPositionCount += 1;
      }

      obstructionCount += findLoop(coordinate, coordinate, currentDirection);

      map[coordinate[0]][coordinate[1]] = currentDirection;

      coordinate = [coordinate[0] + rowInc, coordinate[1] + colInc];
    }

    if (!isValidCoordinate(coordinate))
      return [distinctPositionCount, obstructionCount];

    const tempCount = nextDirectionPatrol(coordinate, currentDirection);
    distinctPositionCount += tempCount[0];
    obstructionCount += tempCount[1];

    return [distinctPositionCount, obstructionCount];
  }

  const startingCoordinate = findStartingCoordinate();

  console.log(patrol(startingCoordinate, "U"));
} catch (err) {
  console.error("Error reading the file:", err);
}
