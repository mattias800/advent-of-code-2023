import { byStrengthFullRow, getHandStrength } from "./common.mjs";

export const part1 = (input: string) => {
  const lines = input.split("\n").filter((p) => p);

  console.log(lines);
  lines.sort(byStrengthFullRow);
  console.log(lines);
  console.log(lines.map((a) => a + "=" + getHandStrength(a.split(" ")[0])));
  console.log("Part 1 solution: " + "??");
};
