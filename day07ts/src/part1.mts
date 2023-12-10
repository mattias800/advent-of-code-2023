import {
  fromRowToHandBid,
  getFiveOfAKind,
  getFourOfAKind,
  getFullHouse,
  getPair,
  getThreeOfAKind,
  getTwoPair,
  HandBid,
  strengthOrder,
} from "./common.mjs";

export const part1 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 1 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const lines = input.split("\n").filter((p) => p);

  const handBids = lines.map(fromRowToHandBid);
  handBids.sort(byHandBidStrength);
  handBids.reverse();

  const withRank = handBids.map((h, i) => ({
    ...h,
    rank: i + 1,
    strength: getHandStrength(h.hand),
  }));

  const values = withRank.map((w) => w.bid * w.rank);
  return values.reduce((sum, item) => sum + item, 0);
};

export const getHandStrength = (hand: string): number => {
  const fiveOfAKind = getFiveOfAKind(hand);
  if (fiveOfAKind) {
    return 7;
  }
  const fourOfAKind = getFourOfAKind(hand);
  if (fourOfAKind) {
    return 6;
  }
  const fullHouse = getFullHouse(hand);
  if (fullHouse) {
    return 5;
  }
  const threeOfAKind = getThreeOfAKind(hand);
  if (threeOfAKind) {
    return 4;
  }
  const twoPair = getTwoPair(hand);
  if (twoPair) {
    return 2;
  }
  const pair = getPair(hand);
  if (pair) {
    return 1;
  }

  return 0;
};

export const byHandBidStrength = (a: HandBid, b: HandBid): number =>
  byHandStrength(a.hand, b.hand);

export const byHandStrength = (a: string, b: string): number => {
  const r = getHandStrength(b) - getHandStrength(a);
  if (r === 0) {
    return byHandPrecedence(a, b);
  }
  return r;
};

export const byHandPrecedence = (a: string, b: string): number => {
  for (let i = 0; i < a.length; i++) {
    const aa = a.charAt(i);
    const bb = b.charAt(i);
    const r = strengthOrder.indexOf(bb) - strengthOrder.indexOf(aa);
    if (r !== 0) {
      return r;
    }
  }
  return 0;
};
