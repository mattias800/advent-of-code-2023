import {
  Brick,
  getBricksBeingSupported,
  getSupportingBricks,
  parseInput,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const bricks = parseInput(input);
  console.log(bricks);
  return countCanBeDisintegrated(bricks);
};

export const countCanBeDisintegrated = (bricks: Array<Brick>): number => {
  let result = 0;

  for (let i = 0; i < bricks.length; i++) {
    const b = bricks[i];
    const beingSupported = getBricksBeingSupported(b, bricks);
    if (beingSupported.length === 0) {
      result++;
      continue;
    }

    for (let j = 0; j < beingSupported.length; j++) {
      if (getSupportingBricks(beingSupported[j], bricks).length === 1) {
        continue;
      }
    }

    result++;
  }

  return result;
};
