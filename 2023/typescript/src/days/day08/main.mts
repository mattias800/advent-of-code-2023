import fs from "fs";
import { part1 } from "./part1.mjs";
import { part2 } from "./part2.mjs";

export const testinput =
  "LLR\n" +
  "\n" +
  "AAA = (BBB, BBB)\n" +
  "BBB = (AAA, ZZZ)\n" +
  "ZZZ = (ZZZ, ZZZ)";

const r = fs.readFileSync("./src/input.txt");
const input = r.toString();

// 252310510 is too high
// 250751652 is too high
part1(input);
part2(input);
