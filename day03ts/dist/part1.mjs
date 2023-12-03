import { getNeighbours, getNumbersInLine, numbers, } from "./common.mjs";
export const part1 = (input) => {
    const lines = input.split("\n").filter((p) => p);
    const charMatrix = getCharMatrix(lines);
    const solution = lines
        .map(getNumbersInLine)
        .map((numbersInLine, lineNumber) => numbersInLine.filter((numberInLine) => getNeighbours(numberInLine, lineNumber).some((neighbour) => hasCharAt(neighbour.line, neighbour.column, charMatrix))))
        .flatMap((p) => p)
        .reduce((sum, item) => sum + parseInt(item.value), 0);
    console.log("Part 1 solution: " + solution);
};
const hasCharAt = (lineNumber, columnNumber, charMatrix) => {
    if (lineNumber < 0 || columnNumber < 0) {
        return false;
    }
    return charMatrix[lineNumber]?.[columnNumber] ?? false;
};
const getCharMatrix = function (lines) {
    return lines.reduce((sum, item, lineNumber) => {
        sum[lineNumber] = getColumnsWithChar(item);
        return sum;
    }, {});
};
const getColumnsWithChar = (line) => line.split("").reduce((sum, char, index) => {
    if (numbers.indexOf(char) < 0 && char !== ".") {
        sum[index] = true;
    }
    return sum;
}, {});
