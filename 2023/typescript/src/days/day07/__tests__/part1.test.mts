import { getSolution } from "../part1.mts";
import fs from "fs";

describe("Day 07", () => {
  describe("Part 1", () => {
    describe("getSolution", () => {
      it("works with test data", () => {
        expect(
          getSolution(
            "32T3K 765\n" +
              "T55J5 684\n" +
              "KK677 28\n" +
              "KTJJT 220\n" +
              "QQQJA 483",
          ),
        ).toBe(6440);
      });
      it("works with input", () => {
        expect(
          getSolution(fs.readFileSync("./src/days/day07/input.txt").toString()),
        ).toBe(249638405);
      });
    });
  });
});
