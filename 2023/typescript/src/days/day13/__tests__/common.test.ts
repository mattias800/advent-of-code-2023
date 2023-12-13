import {
  calculateSolution,
  columnsAreEqual,
  findHorizontalMirrorLine,
  findMirrorColumnWithMismatch,
  findMirrorRowWithMismatch,
  findVerticalMirrorLine,
  parseInput,
} from "../common.mts";
import { describe } from "@vitest/runner";

describe("Day 13", () => {
  describe("day13common", () => {
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
    const maps = parseInput(testinput);

    describe("calculateSolution", () => {
      it("works with test data", () => {
        expect(calculateSolution(maps)).toBe(405);
      });
    });

    describe("findMirrorColumnWithMismatch", () => {
      describe("when there is a vertical mirror line", () => {
        it("finds it", () => {
          expect(findMirrorColumnWithMismatch(maps[0], 0)).toBe(4);
        });
      });
      describe("when there is no vertical mirror line", () => {
        it("returns undefined", () => {
          expect(findMirrorColumnWithMismatch(maps[1], 0)).toBe(undefined);
        });
      });
    });

    describe("findMirrorRowWithMismatch", () => {
      describe("when there is a horizontal mirror line", () => {
        it("finds it", () => {
          expect(findMirrorRowWithMismatch(maps[1], 0)).toBe(3);
        });
      });
      describe("when there is no horizontal mirror line", () => {
        it("returns undefined", () => {
          expect(findMirrorRowWithMismatch(maps[0], 0)).toBe(undefined);
        });
      });
    });

    describe("findMirrorRowWithMismatch", () => {
      it("works with test data", () => {
        expect(findMirrorRowWithMismatch(maps[0], 1)).toBe(2);
      });
      it("works with test data", () => {
        expect(findMirrorRowWithMismatch(maps[1], 1)).toBe(0);
      });
    });

    describe("findVerticalMirrorLine", () => {
      describe("when there is a vertical mirror line", () => {
        it("finds it", () => {
          expect(findVerticalMirrorLine(maps[0])).toBe(4);
        });
      });
      describe("when there is no vertical mirror line", () => {
        it("returns undefined", () => {
          expect(findVerticalMirrorLine(maps[1])).toBe(undefined);
        });
      });
    });

    describe("findHorizontalMirrorLine", () => {
      describe("when there is a horizontal mirror line", () => {
        it("finds it", () => {
          expect(findHorizontalMirrorLine(maps[1])).toBe(3);
        });
      });
      describe("when there is no horizontal mirror line", () => {
        it("returns undefined", () => {
          expect(findHorizontalMirrorLine(maps[0])).toBe(undefined);
        });
      });
    });
    describe("columnsAreEqual", () => {
      describe("when columns are equal", () => {
        it("returns true", () => {
          const maps = parseInput(testinput);
          expect(columnsAreEqual(maps[1], 2, 3)).toBe(true);
        });
      });
      describe("when columns are not equal", () => {
        it("returns true", () => {
          const maps = parseInput(testinput);
          expect(columnsAreEqual(maps[1], 1, 4)).toBe(false);
        });
      });
    });
  });
});
