import { getSolution } from "../part1.mjs";

describe("Day 14", () => {
  describe("Part 1", () => {
    describe("getSolution", () => {
      const testdata =
        "O....#....\n" +
        "O.OO#....#\n" +
        ".....##...\n" +
        "OO.#O....O\n" +
        ".O.....O#.\n" +
        "O.#..O.#.#\n" +
        "..O..#O..O\n" +
        ".......O..\n" +
        "#....###..\n" +
        "#OO..#....";

      it("works with test data", () => {
        expect(getSolution(testdata)).toBe(136);
      });

      // it("works with input", () => {
      //   expect(
      //     getSolution(fs.readFileSync("./src/days/day12/input.txt").toString()),
      //   ).toBe(7286);
      // });
    });
  });
});
