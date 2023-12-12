import {
  createTrailTileMap,
  findStart,
  findStartDirections,
  findTotalLength,
  parseTileMap,
  replaceStartWithTile,
  Tile,
  TileMap,
  TileRow,
  Trail,
  TrailTileMap,
  TrailTileRow,
} from "./common.mts";

export const getSolution = (input: string): number => {
  const tileMap = parseTileMap(input);
  const start = findStart(tileMap);
  const startDirections = findStartDirections(tileMap);

  const trailTileMap = createTrailTileMap(tileMap);
  findTotalLength(start, startDirections[0], tileMap, trailTileMap);
  markTrailTileMap(trailTileMap, replaceStartWithTile(tileMap));

  return countTrailTiles(trailTileMap, "inside");
};

export const markTrailTileMap = (
  trailTileMap: TrailTileMap,
  tileMapWithNoStart: TileMap,
) => {
  for (let i = 0; i < trailTileMap.rows.length; i++) {
    markTrailTileRow(trailTileMap.rows[i], tileMapWithNoStart.rows[i]);
  }
};

export const markTrailTileRow = (
  row: TrailTileRow,
  tileRowWithNoStart: TileRow,
) => {
  let inside = false;
  let prevPipeTile: Tile | undefined = undefined;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === "empty") {
      row[i] = inside ? "inside" : "outside";
    }
    if (row[i] === "loop") {
      if (tileRowWithNoStart[i] === "-") {
        if (prevPipeTile == null) {
          throw new Error("Illegal pipe with no start");
        }
      } else if (tileRowWithNoStart[i] === "|") {
        inside = !inside;
      } else if (tileRowWithNoStart[i] === "L") {
        prevPipeTile = "L";
      } else if (tileRowWithNoStart[i] === "7") {
        if (prevPipeTile == null) {
          throw new Error("Illegal pipe.");
        }
        if (prevPipeTile === "L") {
          inside = !inside;
        }
        prevPipeTile = undefined;
      } else if (tileRowWithNoStart[i] === "F") {
        prevPipeTile = "F";
      } else if (tileRowWithNoStart[i] === "J") {
        if (prevPipeTile == null) {
          throw new Error("Illegal pipe.");
        }
        if (prevPipeTile === "F") {
          inside = !inside;
        }
        prevPipeTile = undefined;
      }
    }
  }
};

export const countTrailTiles = (
  trailTileMap: TrailTileMap,
  trailTile: Trail,
): number =>
  trailTileMap.rows.reduce(
    (sum, item) => sum + countTrailTilesInRow(item, trailTile),
    0,
  );

export const countTrailTilesInRow = (
  row: TrailTileRow,
  trailTile: Trail,
): number => {
  return row.reduce((sum, item) => (item === trailTile ? sum + 1 : sum), 0);
};
