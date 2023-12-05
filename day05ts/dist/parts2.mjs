import { readSeedMaps, resolveLocationForSeed } from "./common.mjs";
import lodash from "lodash";
const { chunk, range } = lodash;
export const part2 = (input) => {
    const { seedMaps, seeds } = readSeedMaps(input);
    const seedRanges = chunk(seeds, 2);
    const seedNumbers = seedRanges.flatMap((rangePair) => range(rangePair[0], rangePair[0] + rangePair[1]));
    const allLocations = seedNumbers.map((seed) => resolveLocationForSeed(seed, "seed", seedMaps));
    const solution = Math.min(...allLocations);
    console.log("Part 2 solution: " + solution);
};
