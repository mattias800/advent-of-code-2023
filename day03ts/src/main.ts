import fs from "fs";
const numbers = "0123456789";

interface NumberInLine {
  value: string;
  start: number;
}

type CharMatrix = Record<number, Record<number, boolean>>;

interface Coordinate {
  column: number;
  line: number;
}

const testinput =
  "467..114..\n" +
  "...*......\n" +
  "..35..633.\n" +
  "......#...\n" +
  "617*......\n" +
  ".....+.58.\n" +
  "..592.....\n" +
  "......755.\n" +
  "...$.*....\n" +
  ".664.598..";

const part1 = () => {
  const r = fs.readFileSync("./src/input.txt");
  const lines = r
    .toString()
    .split("\n")
    .filter((p) => p);

  const charMatrix = getCharMatrix(lines);

  const solution = lines
    .map(getNumbersInLine)
    .map((numbersInLine, lineNumber) =>
      numbersInLine.filter((numberInLine) =>
        getNeighbours(numberInLine, lineNumber).some((neighbour) =>
          hasCharAt(neighbour.line, neighbour.column, charMatrix),
        ),
      ),
    )
    .flatMap((p) => p)
    .reduce((sum, item) => sum + parseInt(item.value), 0);

  console.log("Solution: " + solution);
};

const getNeighbours = (
  numberInLine: NumberInLine,
  lineNumber: number,
): Array<Coordinate> => {
  const list: Array<Coordinate> = [];

  list.push({ column: numberInLine.start - 1, line: lineNumber });
  list.push({
    column: numberInLine.start + numberInLine.value.length,
    line: lineNumber,
  });

  for (
    let column = numberInLine.start - 1;
    column < numberInLine.start + numberInLine.value.length + 1;
    column++
  ) {
    list.push({ column, line: lineNumber - 1 });
    list.push({ column, line: lineNumber + 1 });
  }
  return list;
};

const hasCharAt = (
  lineNumber: number,
  columnNumber: number,
  charMatrix: CharMatrix,
): boolean => {
  if (lineNumber < 0 || columnNumber < 0) {
    return false;
  }
  return charMatrix[lineNumber]?.[columnNumber] ?? false;
};

const getNumbersInLine = (line: string): Array<NumberInLine> => {
  const list: Array<NumberInLine> = [];
  let currentNumber: NumberInLine | undefined = undefined;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (numbers.indexOf(char) >= 0) {
      if (currentNumber == null) {
        currentNumber = {
          start: i,
          value: char,
        };
      } else {
        currentNumber.value += char;
      }
    } else {
      if (currentNumber != null) {
        list.push(currentNumber);
        currentNumber = undefined;
      }
    }
  }
  if (currentNumber != null) {
    list.push(currentNumber);
  }
  return list;
};

const getCharMatrix = function (lines: Array<string>): CharMatrix {
  return lines.reduce((sum, item, lineNumber) => {
    sum[lineNumber] = getColumnsWithChar(item);
    return sum;
  }, {} as CharMatrix);
};

const getColumnsWithChar = (line: string): Record<number, boolean> =>
  line.split("").reduce(
    (sum, char, index) => {
      if (numbers.indexOf(char) < 0 && char !== ".") {
        sum[index] = true;
      }
      return sum;
    },
    {} as Record<number, boolean>,
  );

part1();
