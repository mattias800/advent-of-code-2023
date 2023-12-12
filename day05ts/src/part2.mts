import {
  createSeedMapsBySource,
  readSeedMaps,
  resolveLocationForSeed,
} from "./common.mts";

export const part2 = (input: string) => {
  const { seedMaps, seeds } = readSeedMaps(input);

  const seedMapsBySource = createSeedMapsBySource(seedMaps);

  console.log("Calculating part 2, this will take a while...");

  let lowest: number | undefined = undefined;

  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const len = seeds[i + 1];
    console.log(
      "" + i + "/" + seeds.length + " ... " + len + " numbers to resolve.",
    );
    for (let j = 0; j < len; j++) {
      const seedNumber = start + j;
      const v = resolveLocationForSeed(seedNumber, "seed", seedMapsBySource);
      if (lowest == null || v < lowest) {
        lowest = v;
      }
    }
  }
  console.log("Part 2 solution: " + lowest);
};
