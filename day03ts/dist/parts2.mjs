import { getNeighbours, getNumbersInLine, } from "./common.mjs";
export const part2 = (input) => {
    const lines = input.split("\n").filter((p) => p);
    const charMatrix = getCharMatrixWithStars(lines);
    lines.map(getNumbersInLine).forEach((numbersInLine, lineNumber) => {
        numbersInLine.forEach((numberInLine) => {
            decorateCharMatrixWithNeighbours(charMatrix, numberInLine, lineNumber);
        });
    });
    const solution = Object.values(charMatrix)
        .flatMap((p) => Object.values(p))
        .filter((ll) => ll.length === 2)
        .map((ll) => parseInt(ll[0].value) * parseInt(ll[1].value))
        .reduce((sum, item) => sum + item, 0);
    console.log("Part 2 solution: " + solution);
};
const decorateCharMatrixWithNeighbours = (charMatrix, numberInLine, lineNumber) => {
    const neighbours = getNeighbours(numberInLine, lineNumber);
    neighbours.forEach((neighbour) => {
        if (neighbour.line >= 0 && neighbour.column >= 0) {
            charMatrix[neighbour.line]?.[neighbour.column]?.push(numberInLine);
        }
    });
};
const getCharMatrixWithStars = (lines) => {
    return lines.reduce((sum, item, lineNumber) => {
        sum[lineNumber] = getColumnsWithStarChar(item);
        return sum;
    }, {});
};
const getColumnsWithStarChar = (line) => line.split("").reduce((sum, char, index) => {
    if (char === "*") {
        sum[index] = [];
    }
    return sum;
}, {});
