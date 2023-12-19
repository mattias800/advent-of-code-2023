import {
  addPosition,
  isWithinBounds,
  Position,
} from "../../common/location/Position.ts";
import {
  Direction,
  isOppositeDirection,
  toVector,
} from "../../common/location/Direction.ts";

export interface Visited {
  row: number;
  column: number;
  direction: Direction | undefined;
  numDirection: number;
}

export interface PriorityItem {
  totalHeatLoss: number;
  position: Position;
  direction: Direction | undefined;
  numDirection: number;
}

export type PriorityQueue = Array<PriorityItem>;

export const createStartingPriorityItem = (): PriorityItem => ({
  position: {
    row: 0,
    column: 0,
  },
  direction: undefined,
  numDirection: 0,
  totalHeatLoss: 0,
});

export const parseInput = (input: string): Array<string> =>
  input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((s) => s.trim());

export const getMinimalHeatLoss = (
  lines: Array<string>,
  minMovesBeforeTurnOrStop: number,
  maxMovesAfterTurn: number,
): number => {
  const visited = new Set<string>();
  const queue: PriorityQueue = [createStartingPriorityItem()];

  const numRows = lines.length;
  const numColumns = lines[0].length;

  const isInGrid = isWithinBounds(numRows, numColumns);

  const addToQueue = (
    item: PriorityItem,
    nextPos: Position,
    nextDirection: Direction,
    numDirection: number,
  ) => {
    if (isInGrid(nextPos)) {
      const nextHeatLoss = parseInt(lines[nextPos.row].charAt(nextPos.column));
      queue.push({
        position: nextPos,
        direction: nextDirection,
        numDirection,
        totalHeatLoss: item.totalHeatLoss + nextHeatLoss,
      });
    }
  };

  while (queue.length) {
    const item = queue.shift();

    if (item == null) {
      break;
    }

    if (
      item.position.column === numColumns - 1 &&
      item.position.row === numRows - 1 &&
      item.numDirection >= minMovesBeforeTurnOrStop
    ) {
      return item.totalHeatLoss;
    }

    if (!isInGrid(item.position)) {
      continue;
    }

    const visitedItem = visitedKey({
      row: item.position.row,
      column: item.position.column,
      numDirection: item.numDirection,
      direction: item.direction,
    });

    if (visited.has(visitedItem)) {
      continue;
    }

    visited.add(visitedItem);

    if (item.direction != null) {
      if (item.numDirection < maxMovesAfterTurn) {
        const nextPos = addPosition(item.position, toVector(item.direction));
        addToQueue(item, nextPos, item.direction, item.numDirection + 1);
      }
    }

    if (
      item.direction == null ||
      item.numDirection >= minMovesBeforeTurnOrStop
    ) {
      for (const nextDirection of [0, 1, 2, 3]) {
        if (
          nextDirection !== item.direction &&
          (item.direction == null ||
            !isOppositeDirection(nextDirection, item.direction))
        ) {
          addToQueue(
            item,
            addPosition(item.position, toVector(nextDirection)),
            nextDirection,
            1,
          );
        }
      }
    }

    queue.sort(byTotalHeatLoss);
  }

  throw new Error("Did not reach destination.");
};

export const byTotalHeatLoss = (a: PriorityItem, b: PriorityItem): number =>
  a.totalHeatLoss - b.totalHeatLoss;

export const visitedKey = (visited: Visited) =>
  `${visited.row}:${visited.column}:${visited.numDirection}:${visited.direction}`;
