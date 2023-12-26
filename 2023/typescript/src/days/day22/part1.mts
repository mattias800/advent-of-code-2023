import {
  Brick,
  getBricksBeingSupported,
  getSupportingBricks,
  parseInput,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const bricks = parseInput(input);
  return countCanBeDisintegrated(bricks);
};

export const countCanBeDisintegrated = (bricks: Array<Brick>): number => {
  let result = 0;

  main: for (let i = 0; i < bricks.length; i++) {
    const b = bricks[i];
    console.log("check " + b.name);
    const beingSupported = getBricksBeingSupported(b, bricks);
    console.log(
      "beingSupported.length",
      beingSupported.map((b) => b.name).join(","),
    );
    if (beingSupported.length === 0) {
      console.log(
        "disintegrate " + b.name + ", it does not support any other bricks",
      );
      result++;
      continue;
    }

    for (let j = 0; j < beingSupported.length; j++) {
      const supportingBricks = getSupportingBricks(beingSupported[j], bricks);
      if (supportingBricks.length === 1) {
        console.log(
          "cannot disintegrate, it is single supporter of " +
            supportingBricks[0].name,
        );
        continue main;
      }

      console.log(
        "disintegrate " +
          b.name +
          ", it supports other bricks, but they can still be supported",
      );
      result++;
    }
  }

  return result;
};
