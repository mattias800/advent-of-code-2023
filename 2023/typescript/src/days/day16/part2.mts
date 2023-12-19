import { countEnergizedTiles, Grid, parseInput, traverse } from "./common.mjs";
import { Position } from "../../common/location/Position.ts";
import { Direction } from "../../common/location/Direction.ts";

export const getSolution = (input: string): number => {
  const g = parseInput(input);

  const starts = getStarts(g);
  const all = starts.map(({ position, direction }) => {
    const e = {};
    traverse(position, direction, g, e);
    return countEnergizedTiles(g, e);
  });

  return all.reduce((sum, item) => (item > sum ? item : sum), 0);
};

interface Start {
  position: Position;
  direction: Direction;
}

export const getStarts = (grid: Grid): Array<Start> => {
  const list: Array<Start> = [];

  for (let column = 0; column < grid.numColumns; column++) {
    list.push({ position: { row: 0, column }, direction: Direction.Down });
    list.push({
      position: { row: grid.numRows - 1, column },
      direction: Direction.Up,
    });
  }
  for (let row = 0; row < grid.numRows; row++) {
    list.push({ position: { row, column: 0 }, direction: Direction.Right });
    list.push({
      position: { row, column: grid.numColumns - 1 },
      direction: Direction.Left,
    });
  }

  return list;
};
