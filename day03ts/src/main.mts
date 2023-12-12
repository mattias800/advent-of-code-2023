import fs from "fs";
import { part1 } from "./part1.mts";
import { part2 } from "./part2.mts";

export const testinput =
  "467..114..\n" +
  "...*......\n" +
  "..35..633.\n" +
  "......#...\n" +
  "617*......\n" +
  ".....+.58.\n" +
  "..592.....\n" +
  "......755.\n" +
  "...$.*....\n" +
  ".664.598..";

const r = fs.readFileSync("./src/input.txt");
const input = r.toString();

part1(input);
part2(input);
