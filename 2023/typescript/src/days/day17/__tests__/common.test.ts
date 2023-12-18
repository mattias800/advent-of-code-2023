import { calculatePreviousDirections, NavigationNode } from "../common.mjs";

describe("Day 17 Common", () => {
  describe("calculatePreviousDirections", () => {
    it("works", () => {
      const q: Array<NavigationNode> = [
        {
          isStartNode: false,
          from: { row: 13, column: 12 },
          position: { row: 12, column: 12 },
        },
        {
          isStartNode: false,
          from: { row: 13, column: 13 },
          position: { row: 13, column: 12 },
        },
        {
          isStartNode: false,
          from: { row: 12, column: 13 },
          position: { row: 13, column: 13 },
        },
        {
          isStartNode: false,
          from: { row: 11, column: 13 },
          position: { row: 12, column: 13 },
        },
        {
          isStartNode: false,
          from: { row: 10, column: 13 },
          position: { row: 11, column: 13 },
        },
        {
          isStartNode: false,
          from: { row: 10, column: 12 },
          position: { row: 10, column: 13 },
        },
        {
          isStartNode: false,
          from: { row: 10, column: 11 },
          position: { row: 10, column: 12 },
        },
        {
          isStartNode: false,
          from: { row: 10, column: 10 },
          position: { row: 10, column: 11 },
        },
        {
          isStartNode: true,
          from: undefined,
          position: { row: 10, column: 10 },
        },
      ];

      expect(
        calculatePreviousDirections(q, {
          from: { row: 13, column: 12 },
          position: { row: 12, column: 12 },
          isStartNode: true,
        }),
      ).toEqual([
        "right",
        "right",
        "right",
        "down",
        "down",
        "down",
        "left",
        "up",
      ]);
    });
  });
});
