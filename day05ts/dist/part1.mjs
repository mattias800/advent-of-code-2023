import { readSeedMaps, resolveLocationForSeed } from "./common.mjs";
export const part1 = (input) => {
    const { seedMaps, seeds } = readSeedMaps(input);
    const allLocations = seeds.map((seed) => resolveLocationForSeed(seed, "seed", seedMaps));
    const solution = Math.min(...allLocations);
    console.log("Part 1 solution: " + solution);
};
