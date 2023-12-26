import {
  addVectors,
  isVectorEqual,
  Vector,
} from "../../common/location/Vector.ts";

export interface Brick {
  name?: string;
  start: Vector;
  end: Vector;
}

export const parseInput = (input: string): Array<Brick> =>
  input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim())
    .map((r) => parseRow(r))
    .map((r, i) => ({ ...r, name: "ABCDEFGHIJKLMNOPQ".charAt(i) }));

export const parseRow = (input: string): Brick => {
  const [s, e] = input.split("~");
  return {
    start: parseVector(s, e, true),
    end: parseVector(e, e, false),
  };
};

export const parseVector = (s: string, e: string, useMin: boolean): Vector => {
  const [x1, y1, z1] = s.split(",").map((p) => parseInt(p));
  const [x2, y2, z2] = e.split(",").map((p) => parseInt(p));
  return {
    z: useMin ? Math.min(z1, z2) : Math.max(z1, z2),
    y: useMin ? Math.min(y1, y2) : Math.max(y1, y2),
    x: useMin ? Math.min(x1, x2) : Math.max(x1, x2),
  };
};

export const getSupportingBricks = (
  brick: Brick,
  allBricks: Array<Brick>,
): Array<Brick> =>
  allBricks
    .filter((b) => !isBrickEqual(brick, b))
    .filter((b) => brickIsSupported(brick, b));

export const getBricksBeingSupported = (
  brick: Brick,
  allBricks: Array<Brick>,
): Array<Brick> =>
  allBricks
    .filter((b) => !isBrickEqual(brick, b))
    .filter((b) => brickIsSupported(b, brick));

export const isBrickEqual = (a: Brick, b: Brick): boolean =>
  isVectorEqual(a.start, b.start) && isVectorEqual(a.end, b.end);

const down: Vector = {
  x: 0,
  y: 0,
  z: -1,
};

export const brickIsSupported = (
  brick: Brick,
  isSupportedBy: Brick,
): boolean => {
  return bricksIntersect(moveBrickDown(brick), isSupportedBy);
};

export const moveBrickDown = (brick: Brick): Brick => {
  return {
    start: addVectors(brick.start, down),
    end: addVectors(brick.end, down),
  };
};

export const bricksIntersect = (a: Brick, b: Brick) => {
  if (a.start.x > b.end.x || b.start.x > a.end.x) return false;
  if (a.start.y > b.end.y || b.start.y > a.end.y) return false;
  if (a.start.z > b.end.z || b.start.z > a.end.z) return false;

  return true;
};

export const fallBricksToGround = (bricks: Array<Brick>) => {
  for (let i = 0; i < bricks.length; i++) {
    if (
      bricks[i].start.z > 1 &&
      getSupportingBricks(bricks[i], bricks).length === 0
    ) {
      const d = moveBrickDown(bricks[i]);
      bricks[i].start = d.start;
      bricks[i].end = d.end;
      i = 0;
    }
  }
};
