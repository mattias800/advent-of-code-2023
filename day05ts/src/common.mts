export interface SeedMap {
  source: string;
  destination: string;
  offsets: Array<SeedMapOffset>;
}

export interface SeedMapOffset {
  destinationStart: number;
  sourceStart: number;
  range: number;
}

export const readSeedMaps = (
  input: string,
): { seeds: Array<number>; seedMaps: Array<SeedMap> } => {
  const sections = input.split("\n\n");

  const [seedsString, ...seedMapsList] = sections;

  const seeds = createSeeds(seedsString);
  const seedMaps = seedMapsList.map((s) => createSeedMap(s));

  return {
    seeds,
    seedMaps,
  };
};

// "seeds: 79 14 55 13"
const createSeeds = (input: string): Array<number> => {
  return input
    .split(": ")[1]
    .split(" ")
    .map((p) => parseInt(p));
};

// "'"seed-to-soil map:\n50 98 2\n52 50 48"'"
const createSeedMap = (input: string): SeedMap => {
  const [namePart, offsetPart] = input.split(":\n");
  const [source, destination] = namePart.split(" ")[0].split("-to-");
  const offsets = offsetPart
    .split("\n")
    .map((numberList) => numberList.split(" ").map((n) => parseInt(n)))
    .map<SeedMapOffset>((p) => ({
      destinationStart: p[0],
      sourceStart: p[1],
      range: p[2],
    }));

  return { source, destination, offsets };
};
