import { getSolution } from "../part2.mts";

describe("Day 09", () => {
  describe("Part 2 ", () => {
    describe("getSolution", () => {
      it("works with small test data", () => {
        expect(
          getSolution(".....\n" + ".S-7.\n" + ".|.|.\n" + ".L-J.\n" + "....."),
        ).toBe(0);
      });
    });
  });
});
