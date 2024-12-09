const fs = require("fs");
const os = require("os");

const filePath = "./input.txt";
// const filePath = "./test-input.txt";

try {
  const data = fs.readFileSync(filePath, "utf8");
  const disk = [];

  fileCount = 0;

  let isFile = true;

  for (const d of data) {
    for (let i = 0; i < parseInt(d); i++) {
      if (isFile) {
        disk.push(fileCount);
      } else {
        disk.push(".");
      }
    }
    if (isFile) {
      fileCount += 1;
    }
    isFile = !isFile;
  }

  let i = 0;
  let j = disk.length - 1;

  let checksum = 0;

  // Part - 1
  // while (i < j) {
  //   if (disk[i] !== ".") {
  //     checksum += i * disk[i];
  //     i += 1;
  //     continue;
  //   }

  //   if (disk[j] === ".") {
  //     j -= 1;
  //     continue;
  //   }

  //   if (disk[i] === "." && disk[j] !== ".") {
  //     [disk[i], disk[j]] = [disk[j], disk[i]];
  //     checksum += i * disk[i];
  //     i += 1;
  //     j -= 1;
  //   }
  // }

  // Verify last number
  // if (disk[i] !== ".") {
  //   checksum += i * disk[i];
  // }

  while (j > 0) {
    if (disk[j] === ".") {
      j -= 1;
    }

    let fileSize = 0;
    let file = disk[j];

    while (disk[j] === file) {
      fileSize += 1;
      j -= 1;
    }

    j += 1;
    i = 0;

    let canSwap = false;

    while (i < j) {
      if (i !== ".") {

        i += 1;
      }

      let freeSpaceSize = 0;
      let k = i;

      while (disk[k] === "." && k < j) {
        freeSpaceSize += 1;
        k += 1;
      }

      if (fileSize <= freeSpaceSize) {
        canSwap = true;
        break;
      } else {
        i = k;
      }
    }

    if (canSwap) {
      for (let l = i; l <= i + fileSize - 1; l++) {
        disk[l] = file;
      }

      for (let l = j; l <= j + fileSize - 1; l++) {
        disk[l] = ".";
      }
    }

    j -= 1;
  }

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== '.') {
      checksum += disk[i] * i;
    }
  }

  console.log(checksum);
} catch (err) {
  console.error("Error reading the file:", err);
}
