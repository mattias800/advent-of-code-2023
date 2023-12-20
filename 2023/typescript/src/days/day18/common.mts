import { Direction, toVector } from "../../common/location/Direction.ts";
import {
  addPosition,
  getMinBoundingBox,
  Position,
  PositionMap,
} from "../../common/location/Position.ts";

export interface Command {
  direction: Direction;
  num: number;
  color: string;
}

export interface DigPoint {
  color?: string;
}

export interface DigMap {
  map: PositionMap<DigPoint | undefined>;
  boundingBox: Position;
}

export const parseInput = (input: string): Array<Command> =>
  input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim())
    .map(parseLine);

export const parseLine = (line: string): Command => {
  const [dir, numString, colorString] = line.split(" ");
  return {
    direction: charToDirection(dir),
    num: parseInt(numString),
    color: colorString.substring(1, colorString.length - 2),
  };
};

export const digByCommands = (commands: Array<Command>): DigMap => {
  const digMap: DigMap = {
    map: { 0: { 0: { color: undefined } } },
    boundingBox: {
      row: 0,
      column: 0,
    },
  };

  let currentPos: Position = {
    column: 0,
    row: 0,
  };

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    for (let j = 0; j < command.num; j++) {
      currentPos = addPosition(currentPos, toVector(command.direction));
      digMap.map[currentPos.column] = digMap.map[currentPos.column] ?? {};
      digMap.map[currentPos.column][currentPos.row] = { color: command.color };
      digMap.boundingBox = getMinBoundingBox(digMap.boundingBox, currentPos);
    }
  }

  return digMap;
};

export const digInside = (digMap: DigMap) => {
  for (let row = 0; row <= digMap.boundingBox.row; row++) {
    let isInside = false;
    let isInDig = false;
    for (let column = 0; column <= digMap.boundingBox.column; column++) {
      const current = digMap.map[column]?.[row];
      if (current != null) {
        if (!isInDig) {
          isInside = !isInside;
        }
        isInDig = true;
      } else {
        if (isInside) {
          digMap.map[column] = digMap.map[column] ?? {};
          digMap.map[column][row] = { color: undefined };
        }
        isInDig = false;
      }
    }
  }
};

export const charToDirection = (char: string): Direction => {
  switch (char) {
    case "U":
      return Direction.Up;
    case "R":
      return Direction.Right;
    case "D":
      return Direction.Down;
    case "L":
      return Direction.Left;
    default:
      throw new Error("Invalid direction character.");
  }
};

export const digMapToString = (digMap: DigMap): string => {
  const list: Array<string> = [];
  for (let row = 0; row <= digMap.boundingBox.row; row++) {
    let line: Array<string> = [];
    for (let column = 0; column <= digMap.boundingBox.column; column++) {
      if (digMap.map[column]?.[row] != null) {
        line.push("#");
      } else {
        line.push(".");
      }
    }
    list.push(line.join(""));
  }

  return list.join("\n");
};

export const countNumDigs = (digMap: DigMap): number => {
  let result = 0;
  for (let row = 0; row <= digMap.boundingBox.row; row++) {
    for (let column = 0; column <= digMap.boundingBox.column; column++) {
      if (digMap.map[column]?.[row] != null) {
        result++;
      }
    }
  }

  return result;
};
