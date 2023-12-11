import { getWins, RaceResult } from "./common.mjs";

export const part2 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 2 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const race = readRowAsOneRaces(input);
  return getWins(race).length;
};

const readRowAsOneRaces = (input: string): RaceResult => {
  const [timesLine, distancesLine] = input.split("\n");
  const [, times] = timesLine.split(":");
  const [, distances] = distancesLine.split(":");
  const time = parseInt(times.replaceAll(" ", ""));
  const distance = parseInt(distances.replaceAll(" ", ""));

  return {
    time,
    distance,
  };
};
