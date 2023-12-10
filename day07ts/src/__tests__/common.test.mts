import {
  getFiveOfAKind,
  getFourOfAKind,
  getFullHouse,
  getPair,
  getThreeOfAKind,
  getTwoPair,
} from "../common.mjs";

describe("common", () => {
  describe("getFiveOfAKind", () => {
    describe("when there are five of same", () => {
      it("returns value", () => {
        expect(getFiveOfAKind("22222")).toBe(1);
        expect(getFiveOfAKind("33333")).toBe(2);
        expect(getFiveOfAKind("AAAAA")).toBe(13);
      });
    });
    describe("when there are NOT five of same", () => {
      it("returns 0", () => {
        expect(getFiveOfAKind("45678")).toBe(0);
      });
    });
  });
  describe("getFourOfAKind", () => {
    describe("when there are five of same", () => {
      it("returns value", () => {
        expect(getFourOfAKind("22222")).toBe(1);
        expect(getFourOfAKind("22221")).toBe(1);
        expect(getFourOfAKind("33333")).toBe(2);
        expect(getFourOfAKind("AAAAA")).toBe(13);
        expect(getFourOfAKind("AAAAB")).toBe(13);
      });
    });
    describe("when there are NOT five of same", () => {
      it("returns 0", () => {
        expect(getFourOfAKind("22211")).toBe(0);
        expect(getFourOfAKind("AAABB")).toBe(0);
        expect(getFourOfAKind("45678")).toBe(0);
      });
    });
  });
  describe("getThreeOfAKind", () => {
    describe("when there are five of same", () => {
      it("returns value", () => {
        expect(getThreeOfAKind("22222")).toBe(1);
        expect(getThreeOfAKind("22221")).toBe(1);
        expect(getThreeOfAKind("22211")).toBe(1);
        expect(getThreeOfAKind("33333")).toBe(2);
        expect(getThreeOfAKind("AAAAA")).toBe(13);
        expect(getThreeOfAKind("AAAAB")).toBe(13);
        expect(getThreeOfAKind("AAABB")).toBe(13);
      });
    });
    describe("when there are NOT five of same", () => {
      it("returns 0", () => {
        expect(getThreeOfAKind("22311")).toBe(0);
        expect(getThreeOfAKind("AACBB")).toBe(0);
        expect(getThreeOfAKind("45678")).toBe(0);
      });
    });
  });
  describe("getTwoPair", () => {
    describe("when there are five of same", () => {
      it("returns value", () => {
        expect(getTwoPair("22233")).toBe(3);
        expect(getTwoPair("AAAKK")).toBe(25);
      });
    });
    describe("when there are NOT five of same", () => {
      it("returns 0", () => {
        expect(getTwoPair("22221")).toBe(0);
        expect(getTwoPair("22222")).toBe(0);
        expect(getTwoPair("45678")).toBe(0);
        expect(getTwoPair("33333")).toBe(0);
        expect(getTwoPair("AAAAA")).toBe(0);
        expect(getTwoPair("AAAAB")).toBe(0);
      });
    });
  });
  describe("getPair", () => {
    describe("when there are five of same", () => {
      it("returns value", () => {
        expect(getPair("22233")).toBe(2);
        expect(getPair("AAAKK")).toBe(13);
      });
    });
    describe("when there are NOT five of same", () => {
      it("returns 0", () => {
        expect(getPair("45678")).toBe(0);
      });
    });
  });
  describe("getFullHouse", () => {
    describe("when there are five of same", () => {
      it("returns value", () => {
        expect(getFullHouse("22233")).toBe(7);
        expect(getFullHouse("22333")).toBe(8);
        expect(getFullHouse("AAAKK")).toBe(63);
        expect(getFullHouse("AAAQQ")).toBe(61);
        expect(getFullHouse("AAQQQ")).toBe(59);
      });
    });
    describe("when there are NOT five of same", () => {
      it("returns 0", () => {
        expect(getFullHouse("45678")).toBe(0);
        expect(getFullHouse("44255")).toBe(0);
      });
    });
  });
});
