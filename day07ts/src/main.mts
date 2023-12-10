import fs from "fs";
import { part1 } from "./part1.mjs";
import { part2 } from "./part2.mjs";

export const testinput =
  "32T3K 765\n" + "T55J5 684\n" + "KK677 28\n" + "KTJJT 220\n" + "QQQJA 483";

const r = fs.readFileSync("./src/input.txt");
const input = r.toString();

part1(testinput);
part2(input);
