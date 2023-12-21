import { describe } from "@vitest/runner";
import {
  extendBoundingBoxWithPosition,
  getBoundingBoxForPositionMap,
} from "../Position.ts";

describe("Position", () => {
  describe("extendBoundingBoxWithPosition", () => {
    describe("when position is smaller than bounding box", () => {
      it("updates min values", () => {
        expect(
          extendBoundingBoxWithPosition(
            { minColumn: 3, minRow: 4, maxColumn: 11, maxRow: 12 },
            { column: -1, row: -2 },
          ),
        ).toEqual({ minColumn: -1, minRow: -2, maxColumn: 11, maxRow: 12 });
      });
    });
    describe("when position is bigger than bounding box", () => {
      it("updates min values", () => {
        expect(
          extendBoundingBoxWithPosition(
            { minColumn: -1, minRow: -2, maxColumn: 11, maxRow: 12 },
            { column: 21, row: 22 },
          ),
        ).toEqual({ minColumn: -1, minRow: -2, maxColumn: 21, maxRow: 22 });
      });
    });
  });
  describe("getBoundingBoxForPositionMap", () => {
    describe("normal", () => {
      it("works", () => {
        expect(
          getBoundingBoxForPositionMap({
            3: {
              5: "",
            },
            6: {
              7: "",
            },
          }),
        ).toEqual({
          minColumn: 3,
          minRow: 5,
          maxColumn: 6,
          maxRow: 7,
        });
      });
    });
    describe("with negative numbers", () => {
      it("works", () => {
        expect(
          getBoundingBoxForPositionMap({
            [-3]: {
              [-5]: "",
            },
            6: {
              7: "",
            },
          }),
        ).toEqual({
          minColumn: -3,
          minRow: -5,
          maxColumn: 6,
          maxRow: 7,
        });
      });
    });
  });
});
