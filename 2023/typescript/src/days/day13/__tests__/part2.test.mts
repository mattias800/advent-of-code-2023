import { getSolution } from "../part2.mjs";
import fs from "fs";

describe("Day 13", () => {
  describe("Part 2 ", () => {
    const testinput =
      "#.##..##.\n" +
      "..#.##.#.\n" +
      "##......#\n" +
      "##......#\n" +
      "..#.##.#.\n" +
      "..##..##.\n" +
      "#.#.##.#.\n" +
      "\n" +
      "#...##..#\n" +
      "#....#..#\n" +
      "..##..###\n" +
      "#####.##.\n" +
      "#####.##.\n" +
      "..##..###\n" +
      "#....#..#";

    describe("getSolution", () => {
      it("works with test data", () => {
        expect(getSolution(testinput)).toBe(400);
      });
      it("works with input", () => {
        expect(
          getSolution(fs.readFileSync("./src/days/day13/input.txt").toString()),
        ).toBe(40995);
      });
    });
  });
});
