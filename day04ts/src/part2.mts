import { getWinningNumbersFromCard } from "./common.mjs";
import lodash from "lodash";

const { range } = lodash;

export const part2 = (input: string) => {
  const lines = input
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p);

  console.log("Part 2 is slow, might take a minute..");

  const solution = lines.reduce((sum, _, lineNumber) => {
    return sum + 1 + getNumWonCards(lines, lineNumber);
  }, 0);

  console.log("Part 2 solution: " + solution);
};

const getNumWonCards = (lines: Array<string>, lineNumber: number): number => {
  if (lineNumber >= lines.length) {
    return 0;
  }

  const cardLine = lines[lineNumber];

  const numWins = getWinningNumbersFromCard(cardLine).length;

  if (numWins === 0) {
    return 0;
  }

  const wonCardNumbers = range(lineNumber + 1, lineNumber + 1 + numWins);

  return wonCardNumbers.reduce((sum, item) => {
    return sum + 1 + getNumWonCards(lines, item);
  }, 0);
};
