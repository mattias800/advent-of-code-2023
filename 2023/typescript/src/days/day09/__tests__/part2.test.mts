import { getSolution } from "../part2.mts";
import fs from "fs";

describe("Day 09", () => {
  describe("Part 2 ", () => {
    describe("getSolution", () => {
      it("works with small test data", () => {
        expect(getSolution("10 13 16 21 30 45")).toBe(5);
      });

      it("works with original test data", () => {
        expect(
          getSolution(
            "0 3 6 9 12 15\n" + "1 3 6 10 15 21\n" + "10 13 16 21 30 45",
          ),
        ).toBe(2);
      });

      it("works", () => {});
      it("does nothing", () => {
        expect(true).toBe(true);
      });
      // it("works with input", () => {
      //   expect(
      //     getSolution(fs.readFileSync("./src/days/day09/input.txt").toString()),
      //   ).toBe(1041);
      // });
    });
  });
});
