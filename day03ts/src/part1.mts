import {
  CharMatrix,
  getNeighbours,
  getNumbersInLine,
  numbers,
} from "./common.mjs";

export const part1 = (input: string) => {
  const lines = input.split("\n").filter((p) => p);

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

  console.log("Part 1 solution: " + solution);
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
