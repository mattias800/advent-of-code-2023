export type NorthSouth = "|";
export type EastWest = "-";
export type NorthEast = "L";
export type NorthWest = "J";
export type SouthWest = "7";
export type SouthEast = "F";
export type Ground = ".";
export type Start = "S";

export type DirectionCompass = "north" | "south" | "east" | "west";

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

export interface PositionColRow {
  column: number;
  row: number;
}

export interface TileMap {
  rows: Array<TileRow>;
}

export type Trail = "empty" | "loop" | "inside" | "outside";

export interface TrailTileMap {
  rows: Array<TrailTileRow>;
}

export type TrailTileRow = Array<Trail>;

export const createTrailTileMap = (tileMap: TileMap): TrailTileMap => {
  return {
    rows: tileMap.rows.map<TrailTileRow>((r) => r.map(() => "empty")),
  };
};
export const getOppositeDirection = (
  direction: DirectionCompass,
): DirectionCompass => {
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

export const getTileAtPosition = (
  tileMap: TileMap,
  position: PositionColRow,
): Tile => tileMap.rows[position.row][position.column];

export const findStart = (tileMap: TileMap): PositionColRow => {
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

export const getSurroundingPositions = (
  position: PositionColRow,
): Array<{ position: PositionColRow; direction: DirectionCompass }> => {
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
export const findStartDirections = (
  tileMap: TileMap,
): Array<DirectionCompass> => {
  const startPosition = findStart(tileMap);
  const surrounding = getSurroundingPositions(startPosition);
  return surrounding
    .filter(({ position }) => position.row >= 0 && position.column >= 0)
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
  currentPosition: PositionColRow,
  nextDirection: DirectionCompass,
  tileMap: TileMap,
  trailTileMap?: TrailTileMap,
): number => {
  let pos = currentPosition;
  let dir = nextDirection;
  let counter = 0;

  if (trailTileMap) {
    trailTileMap.rows[pos.row][pos.column] = "loop";
  }

  for (let i = 0; i < 100000; i++) {
    counter++;
    const oppositeDirection = getOppositeDirection(dir);
    const nextPosition = goFromPosition(pos, dir);
    const nextTile = getTileAtPosition(tileMap, nextPosition);
    if (nextTile === "S") {
      return counter;
    }
    if (trailTileMap) {
      trailTileMap.rows[nextPosition.row][nextPosition.column] = "loop";
    }

    const [possibleDir1, possibleDir2] = getTileDirections(nextTile);
    dir = possibleDir1 === oppositeDirection ? possibleDir2 : possibleDir1;
    pos = nextPosition;
  }

  throw new Error("Could not find length in 100000 steps.");
};

export const getTileDirections = (
  tile: Tile,
): [DirectionCompass, DirectionCompass] => {
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
  position: PositionColRow,
  direction: DirectionCompass,
): PositionColRow => {
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

export const replaceStartWithTile = (tileMap: TileMap): TileMap => {
  const pos = findStart(tileMap);
  const [dir1, dir2] = findStartDirections(tileMap);
  tileMap.rows[pos.row][pos.column] = getTileByDirections([dir1, dir2]);
  return tileMap;
};

export const getTileByDirections = (
  directions: [DirectionCompass, DirectionCompass],
): Tile => {
  if (directions.indexOf("north") >= 0 && directions.indexOf("east") >= 0) {
    return "L";
  }
  if (directions.indexOf("south") >= 0 && directions.indexOf("east") >= 0) {
    return "F";
  }
  if (directions.indexOf("south") >= 0 && directions.indexOf("west") >= 0) {
    return "7";
  }
  if (directions.indexOf("north") >= 0 && directions.indexOf("west") >= 0) {
    return "J";
  }
  if (directions.indexOf("east") >= 0 && directions.indexOf("west") >= 0) {
    return "-";
  }
  if (directions.indexOf("north") >= 0 && directions.indexOf("south") >= 0) {
    return "|";
  }
  throw new Error("Directions to not match any possible tile.");
};
