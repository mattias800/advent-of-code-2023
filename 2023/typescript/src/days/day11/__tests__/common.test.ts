import {
  getDistance,
  parseGalaxyMap,
  totalDistanceBetweenAll,
} from "../common.mjs";

describe("Day 11", () => {
  const testInput =
    "...#......\n" +
    ".......#..\n" +
    "#.........\n" +
    "..........\n" +
    "......#...\n" +
    ".#........\n" +
    ".........#\n" +
    "..........\n" +
    ".......#..\n" +
    "#...#.....";

  const galaxyMap = parseGalaxyMap(testInput);

  describe("day11common", () => {
    describe("totalDistanceBetweenAll", () => {
      describe("with 1 add space", () => {
        it("works", () => {
          expect(totalDistanceBetweenAll(galaxyMap, 1)).toBe(374);
        });
      });
      describe("with 10 times added space", () => {
        it("works", () => {
          expect(totalDistanceBetweenAll(galaxyMap, 9)).toBe(1030);
        });
      });
      describe("with 100 times added space", () => {
        it("works", () => {
          expect(totalDistanceBetweenAll(galaxyMap, 99)).toBe(8410);
        });
      });
    });
    describe("getDistance", () => {
      describe("Galaxy 5 to 9", () => {
        it("returns correct distance", () => {
          expect(getDistance(galaxyMap[4], galaxyMap[8], galaxyMap, 1)).toBe(9);
        });
      });
      describe("Galaxy 1 to 7", () => {
        it("returns correct distance", () => {
          expect(getDistance(galaxyMap[0], galaxyMap[6], galaxyMap, 1)).toBe(
            15,
          );
        });
      });
      describe("Galaxy 8 to 9", () => {
        it("returns correct distance", () => {
          expect(getDistance(galaxyMap[7], galaxyMap[8], galaxyMap, 1)).toBe(5);
        });
      });
    });
  });
});
