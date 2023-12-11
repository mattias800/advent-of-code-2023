import fs from "fs";
import { part1 } from "./part1.mjs";
import { part2 } from "./part2.mjs";

export const testinput = "Time:      7  15   30\n" + "Distance:  9  40  200";

const r = fs.readFileSync("./src/input.txt");
const input = r.toString();

part1(input);
part2(input);
