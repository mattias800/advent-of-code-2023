import { getWinningNumbersFromCard } from "./common.mjs";
import lodash from "lodash";

const { range } = lodash;

export const part2 = (input: string) => {
  const lines = input
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p)
    .map((cardLine) => getWinningNumbersFromCard(cardLine));

  const solution = lines.reduce((sum, _, lineNumber) => {
    return sum + 1 + getNumWonCards(lines, lineNumber);
  }, 0);

  console.log("Part 2 solution: " + solution);
};

const getNumWonCards = (
  winningNumbersByLines: Array<Array<number>>,
  lineNumber: number,
): number => {
  if (lineNumber >= winningNumbersByLines.length) {
    return 0;
  }

  const winningNumbers = winningNumbersByLines[lineNumber];

  if (winningNumbers.length === 0) {
    return 0;
  }

  const wonCardNumbers = range(
    lineNumber + 1,
    lineNumber + 1 + winningNumbers.length,
  );

  return wonCardNumbers.reduce((sum, item) => {
    return sum + getNumWonCards(winningNumbersByLines, item);
  }, winningNumbers.length);
};
