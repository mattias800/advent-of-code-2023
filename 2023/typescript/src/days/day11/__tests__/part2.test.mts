import { getSolution } from "../part2.mts";
import fs from "fs";

describe("Day 11", () => {
  describe("Part 2 ", () => {
    describe("getSolution", () => {
      it("works with test data", () => {
        expect(
          getSolution(
            "...#......\n" +
              ".......#..\n" +
              "#.........\n" +
              "..........\n" +
              "......#...\n" +
              ".#........\n" +
              ".........#\n" +
              "..........\n" +
              ".......#..\n" +
              "#...#.....",
          ),
        ).toBe(82000210);
      });
    });
    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day11/input.txt").toString()),
      ).toBe(842645913794);
    });
  });
});
