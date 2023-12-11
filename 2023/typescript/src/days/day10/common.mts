import { exhaustSwitchCaseElseThrow } from "../../common/util/case/ExhaustiveSwitch.mjs";

export type NorthSouth = "|";
export type EastWest = "-";
export type NorthEast = "L";
export type NorthWest = "J";
export type SouthWest = "7";
export type SouthEast = "F";
export type Ground = ".";
export type Start = "S";

export type Direction = "north" | "south" | "east" | "west";

export type Tile =
  | NorthSouth
  | EastWest
  | NorthEast
  | NorthWest
  | SouthWest
  | SouthEast
  | Ground
  | Start;

export type TileRow = Array<Tile>;

export interface Position {
  column: number;
  row: number;
}

export interface TileMap {
  rows: Array<TileRow>;
}

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case "east":
      return "west";
    case "west":
      return "east";
    case "north":
      return "south";
    case "south":
      return "north";
  }
};

export const getTileAtPosition = (tileMap: TileMap, position: Position): Tile =>
  tileMap.rows[position.row][position.column];

export const findStart = (tileMap: TileMap): Position => {
  for (let i = 0; i < tileMap.rows.length; i++) {
    const row = tileMap.rows[i];
    const column = row.findIndex((c) => c === "S");
    if (column >= 0) {
      return {
        column,
        row: i,
      };
    }
  }
  throw new Error("Could not find start.");
};

export const parseTileMap = (input: string): TileMap => {
  const lines = input
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim());

  const rows = lines.map<TileRow>((line) => line.split("") as Array<Tile>);

  return {
    rows,
  };
};

export const getNextPossibleDirection = (
  tile: Tile,
  lastMoveDirection: Direction,
): Direction => {
  switch (tile) {
    case "|": {
      if (lastMoveDirection === "north") {
        return "north";
      }
      if (lastMoveDirection === "south") {
        return "south";
      }
      break;
    }
    case "-": {
      if (lastMoveDirection === "east") {
        return "east";
      }
      if (lastMoveDirection === "west") {
        return "west";
      }
      break;
    }
    case "J": {
      if (lastMoveDirection === "east") {
        return "north";
      }
      if (lastMoveDirection === "south") {
        return "west";
      }
      break;
    }
    case "F": {
      if (lastMoveDirection === "west") {
        return "south";
      }
      if (lastMoveDirection === "north") {
        return "east";
      }
      break;
    }
    case "7": {
      if (lastMoveDirection === "east") {
        return "south";
      }
      if (lastMoveDirection === "north") {
        return "west";
      }
      break;
    }
    case "L": {
      if (lastMoveDirection === "west") {
        return "north";
      }
      if (lastMoveDirection === "south") {
        return "east";
      }
      break;
    }
    case ".":
      break;
    case "S":
      break;
    default:
      exhaustSwitchCaseElseThrow(tile);
  }
  throw new Error("Cannot get direction for tile: " + tile);
};

const getSurroundingPositions = (
  position: Position,
): Array<{ position: Position; direction: Direction }> => {
  return [
    {
      position: { column: position.column, row: position.row - 1 },
      direction: "north",
    },
    {
      position: { column: position.column - 1, row: position.row },
      direction: "west",
    },
    {
      position: { column: position.column + 1, row: position.row },
      direction: "east",
    },
    {
      position: { column: position.column, row: position.row + 1 },
      direction: "south",
    },
  ];
};
export const findStartDirections = (tileMap: TileMap): Array<Direction> => {
  const startPosition = findStart(tileMap);
  const surrounding = getSurroundingPositions(startPosition);
  return surrounding
    .filter(({ position, direction }) => {
      const oppositeDirection = getOppositeDirection(direction);
      const tile = getTileAtPosition(tileMap, position);
      if (!isTileWithDirection(tile)) {
        return false;
      }
      const tileDirections = getTileDirections(tile);
      return tileDirections.indexOf(oppositeDirection) >= 0;
    })
    .map(({ direction }) => direction);
};

export const findTotalLength = (
  currentPosition: Position,
  nextDirection: Direction,
  tileMap: TileMap,
): number => {
  let pos = currentPosition;
  let dir = nextDirection;
  let counter = 0;

  console.log("LETS GO");
  for (let i = 0; i < 100000; i++) {
    counter++;
    const oppositeDirection = getOppositeDirection(dir);
    const nextPosition = goFromPosition(pos, dir);
    const nextTile = getTileAtPosition(tileMap, nextPosition);
    if (nextTile === "S") {
      return counter;
    }
    console.log("nextTile: " + nextTile);
    const [possibleDir1, possibleDir2] = getTileDirections(nextTile);
    dir = possibleDir1 === oppositeDirection ? possibleDir2 : possibleDir1;
    pos = nextPosition;
  }

  throw new Error("Could not find length in 100 steps.");
};

export const getTileDirections = (tile: Tile): [Direction, Direction] => {
  switch (tile) {
    case "L":
      return ["north", "east"];
    case "F":
      return ["south", "east"];
    case "7":
      return ["south", "west"];
    case "J":
      return ["north", "west"];
    case "-":
      return ["east", "west"];
    case "|":
      return ["north", "south"];
    default:
      throw new Error("Tile does not have directions.");
  }
};

export const isTileWithDirection = (tile: Tile): boolean => {
  switch (tile) {
    case "L":
    case "F":
    case "7":
    case "J":
    case "-":
    case "|":
      return true;
  }
  return false;
};

export const goFromPosition = (
  position: Position,
  direction: Direction,
): Position => {
  switch (direction) {
    case "east":
      return { row: position.row, column: position.column + 1 };
    case "west":
      return { row: position.row, column: position.column - 1 };
    case "north":
      return { row: position.row - 1, column: position.column };
    case "south":
      return { row: position.row + 1, column: position.column };
  }
};
