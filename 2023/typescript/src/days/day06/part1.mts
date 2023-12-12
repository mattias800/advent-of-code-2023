import { getWins, RaceResult } from "./common.mts";

export const part1 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 1 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const races = readRaces(input);

  return races
    .map((race) => getWins(race).length)
    .reduce((sum, item) => sum * item, 1);
};

export const readRaces = (input: string): Array<RaceResult> => {
  const [timesLine, distancesLine] = input.split("\n");
  const [, times] = timesLine.split(":");
  const [, distances] = distancesLine.split(":");
  const timesList = times
    .trim()
    .split(" ")
    .filter((p) => p)
    .map((p) => parseInt(p));
  const distancesList = distances
    .trim()
    .split(" ")
    .filter((p) => p)
    .map((p) => parseInt(p));
  return timesList.map<RaceResult>((time, i) => ({
    time,
    distance: distancesList[i],
  }));
};
