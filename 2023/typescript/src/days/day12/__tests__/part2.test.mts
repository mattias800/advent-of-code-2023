import { getSolution, unfoldDoc } from "../part2.mts";
import fs from "fs";

describe("Day 11", () => {
  describe("Part 2 ", () => {
    describe("unfoldDoc", () => {
      it("works", () => {
        expect(unfoldDoc({ pattern: ".#", groups: [1] })).toEqual({
          pattern: ".#?.#?.#?.#?.#",
          groups: [1, 1, 1, 1, 1],
        });
      });
    });
    describe("getSolution", () => {
      it("works with test data", () => {
        const input =
          "???.### 1,1,3\n" +
          ".??..??...?##. 1,1,3\n" +
          "?#?#?#?#?#?#?#? 1,3,1,6\n" +
          "????.#...#... 4,1,1\n" +
          "????.######..#####. 1,6,5\n" +
          "?###???????? 3,2,1";

        expect(getSolution(input)).toBe(525152);
      });
      it("works with input", () => {
        expect(
          getSolution(fs.readFileSync("./src/days/day12/input.txt").toString()),
        ).toBe(25470469710341);
      });
    });
  });
});
