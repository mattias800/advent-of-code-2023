import { getFiveOfAKind } from "../common.mjs";

describe("part2", () => {
  describe("getFiveOfAKind", () => {
    describe("when five of a kind starts with J", () => {
      it("returns value", () => {
        expect(getFiveOfAKind("J2222")).toBe(1);
      });
    });
  });
});
