import { getAsciiHash } from "../common.mjs";

describe("Day 15 Common", () => {
  describe("getAsciiHash", () => {
    describe("when s is HASH", () => {
      it("returns 52", () => {
        expect(getAsciiHash("HASH")).toBe(52);
      });
    });
  });
});
