import { getSolution } from "../part1.mts";
import fs from "fs";

describe("Day 11", () => {
  describe("Part 1", () => {
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
        ).toBe(374);
      });
      it("works with input", () => {
        expect(
          getSolution(fs.readFileSync("./src/days/day11/input.txt").toString()),
        ).toBe(9599070);
      });
    });
  });
});
