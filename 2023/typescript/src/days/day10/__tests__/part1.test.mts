import { getSolution } from "../part1.mts";
import fs from "fs";

describe("Day 10", () => {
  describe("Part 1", () => {
    describe("getSolution", () => {
      it("works with test data", () => {
        expect(
          getSolution(".....\n" + ".S-7.\n" + ".|.|.\n" + ".L-J.\n" + "....."),
        ).toBe(4);
      });
      it("works with larger test data", () => {
        expect(
          getSolution("..F7.\n" + ".FJ|.\n" + "SJ.L7\n" + "|F--J\n" + "LJ..."),
        ).toBe(8);
      });
      it("works with input", () => {
        expect(
            getSolution(fs.readFileSync("./src/days/day10/input.txt").toString()),
        ).toBe(6831);
      });
    });
  });
});
