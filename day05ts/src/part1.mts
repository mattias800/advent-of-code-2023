import { readSeedMaps, SeedMap, SeedMapOffset } from "./common.mjs";

export const part1 = (input: string) => {
  const { seedMaps, seeds } = readSeedMaps(input);

  const allLocations = seeds.map((seed) =>
    resolveLocationForSeed(seed, "seed", seedMaps),
  );
  const solution = Math.min(...allLocations);

  console.log("Part 1 solution: " + solution);
};

const resolveLocationForSeed = (
  value: number,
  sourceName: string,
  seedMaps: Array<SeedMap>,
): number => {
  const map = getMapBySource(sourceName, seedMaps);
  const next = resolveValueForMap(value, map.offsets);
  const nextSource = map.destination;
  if (nextSource === "location") {
    return next;
  }
  return resolveLocationForSeed(next, nextSource, seedMaps);
};

const getMapBySource = (
  sourceName: string,
  seedMaps: Array<SeedMap>,
): SeedMap => {
  const r = seedMaps.find((s) => s.source === sourceName);
  if (r == null) {
    throw new Error("SeedMap not found.");
  }
  return r;
};

const resolveValueForMap = (
  value: number,
  mapOffsets: Array<SeedMapOffset>,
): number => {
  for (let i = 0; i < mapOffsets.length; i++) {
    const v = resolveValueForMapOffset(value, mapOffsets[i]);
    if (v != null) {
      return v;
    }
  }
  return value;
};

const resolveValueForMapOffset = (
  value: number,
  mapOffset: SeedMapOffset,
): number | undefined => {
  if (
    value >= mapOffset.sourceStart &&
    value < mapOffset.sourceStart + mapOffset.range
  ) {
    const offset = value - mapOffset.sourceStart;
    return mapOffset.destinationStart + offset;
  }
  return undefined;
};
