import { getWinningNumbersFromCard } from "./common.mjs";
export const part1 = (input) => {
    const lines = input
        .split("\n")
        .map((p) => p.trim())
        .filter((p) => p);
    const valueOfLines = lines.map((line) => {
        return getWinningNumbersFromCard(line).reduce((sum) => {
            if (sum === 0) {
                return 1;
            }
            else {
                return sum * 2;
            }
        }, 0);
    });
    const solution = valueOfLines.reduce((sum, item) => sum + item, 0);
    console.log("Part 1 solution: " + solution);
};
