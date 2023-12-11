import { getSolution } from "../part2.mts";
import fs from "fs";

describe("Day 08", () => {
  describe("Part 2 ", () => {
    describe("getSolution", () => {
      it("works with test data", () => {
        expect(
          getSolution(
            "LR\n" +
              "\n" +
              "11A = (11B, XXX)\n" +
              "11B = (XXX, 11Z)\n" +
              "11Z = (11B, XXX)\n" +
              "22A = (22B, XXX)\n" +
              "22B = (22C, 22C)\n" +
              "22C = (22Z, 22Z)\n" +
              "22Z = (22B, 22B)\n" +
              "XXX = (XXX, XXX)",
          ),
        ).toBe(6);
      });
      // it("works with input", () => {
      //   expect(
      //     getSolution(fs.readFileSync("./src/days/day08/input.txt").toString()),
      //   ).toBe(10151663816849);
      // });
    });
  });
});
