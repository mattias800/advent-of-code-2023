import { getSolution } from "../part1.mjs";
import fs from "fs";

describe("Day 12", () => {
  describe("Part 1", () => {
    describe("getSolution", () => {
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

      it("works with test data", () => {
        expect(getSolution(testinput)).toBe(405);
      });
      it("works with input", () => {
        expect(
          getSolution(fs.readFileSync("./src/days/day13/input.txt").toString()),
        ).toBe(37718);
      });
    });
  });
});
