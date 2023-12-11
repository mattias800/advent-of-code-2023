import { getSolution } from "../part1.mts";
import fs from "fs";

describe("Day 08", () => {
  describe("Part 1", () => {
    describe("getSolution", () => {
      it("works with test data", () => {
        expect(
          getSolution(
            "LLR\n" +
              "\n" +
              "AAA = (BBB, BBB)\n" +
              "BBB = (AAA, ZZZ)\n" +
              "ZZZ = (ZZZ, ZZZ)",
          ),
        ).toBe(6);
      });
      it("works with input", () => {
        expect(
          getSolution(fs.readFileSync("./src/days/day08/input.txt").toString()),
        ).toBe(11911);
      });
    });
  });
});
