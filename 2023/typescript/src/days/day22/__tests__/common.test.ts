import {
  brickIsSupported,
  fallBricksToGround,
  parseInput,
} from "../common.mjs";

describe("Day 19 Common", () => {
  const testdata =
    "1,0,1~1,2,1\n" +
    "0,0,2~2,0,2\n" +
    "0,2,3~2,2,3\n" +
    "0,0,4~0,2,4\n" +
    "2,0,5~2,2,5\n" +
    "0,1,6~2,1,6\n" +
    "1,1,8~1,1,9";

  const bricks = parseInput(testdata);

  describe("brickIsSupported", () => {
    describe("when brick is supported", () => {
      it("returns true for A,B", () => {
        expect(brickIsSupported(bricks[1], bricks[0])).toBe(true);
      });
      it("returns true for C,D", () => {
        expect(brickIsSupported(bricks[3], bricks[2])).toBe(true);
      });
    });
    describe("when brick is not supported", () => {
      it("returns false for B,C", () => {
        expect(brickIsSupported(bricks[2], bricks[1])).toBe(false);
      });
      it("returns false for D,E", () => {
        expect(brickIsSupported(bricks[4], bricks[3])).toBe(false);
      });
      it("returns true", () => {
        expect(brickIsSupported(bricks[6], bricks[5])).toBe(false);
        expect(brickIsSupported(bricks[6], bricks[4])).toBe(false);
        expect(brickIsSupported(bricks[6], bricks[3])).toBe(false);
        expect(brickIsSupported(bricks[6], bricks[2])).toBe(false);
        expect(brickIsSupported(bricks[6], bricks[1])).toBe(false);
      });
    });
  });
  describe("fallBricksToGround", () => {
    it("works", () => {
      const bricks = parseInput(testdata);
      fallBricksToGround(bricks);
      expect(bricks[0].start.z).toBe(1); // A
      expect(bricks[1].start.z).toBe(2); // B
      expect(bricks[2].start.z).toBe(2); // C
      expect(bricks[3].start.z).toBe(3); // D
      expect(bricks[4].start.z).toBe(3); // E
      expect(bricks[5].start.z).toBe(4); // F
      expect(bricks[6].start.z).toBe(5); // G
    });
  });
});
