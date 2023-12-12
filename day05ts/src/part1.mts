import {
  createSeedMapsBySource,
  readSeedMaps,
  resolveLocationForSeed,
} from "./common.mts";

export const part1 = (input: string) => {
  const { seedMaps, seeds } = readSeedMaps(input);

  const allLocations = seeds.map((seed) =>
    resolveLocationForSeed(seed, "seed", createSeedMapsBySource(seedMaps)),
  );
  const solution = Math.min(...allLocations);

  console.log("Part 1 solution: " + solution);
};
