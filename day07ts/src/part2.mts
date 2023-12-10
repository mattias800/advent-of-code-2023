import {
  findFirstNonJoker,
  fromRowToHandBid,
  getNumCardsOfKind,
  getNumJokers,
  HandBid,
  strengthOrderWithJoker,
  strengthOrderWithJokerStrongFirst,
} from "./common.mjs";

export const part2 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 2 solution: " + solution);
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

export const getFiveOfAKind = (hand: string): number => {
  const firstNonJoker = findFirstNonJoker(hand);
  for (let i = 1; i < hand.length; i++) {
    if (firstNonJoker !== hand[i] && hand[i] !== "J") {
      return 0;
    }
  }
  return strengthOrderWithJoker.indexOf(firstNonJoker);
};

export const findNumOfAKind = (
  hand: string,
  num: number,
  excludeChar?: string,
): string | undefined => {
  const numJokers = getNumJokers(hand);
  const numRequired = num - numJokers;
  for (let i = 0; i < strengthOrderWithJokerStrongFirst.length; i++) {
    const currentKind = strengthOrderWithJokerStrongFirst[i];
    if (excludeChar && currentKind === excludeChar) {
      continue;
    }

    const numInHand = getNumCardsOfKind(hand, currentKind);
    if (numInHand >= numRequired) {
      return currentKind;
    }
  }
  return undefined;
};

export const getFourOfAKind = (hand: string): number => {
  const f = findNumOfAKind(hand, 4);
  if (f == null) {
    return 0;
  }
  return strengthOrderWithJoker.indexOf(f);
};

export const getThreeOfAKind = (hand: string): number => {
  const f = findNumOfAKind(hand, 3);
  if (f == null) {
    return 0;
  }
  return strengthOrderWithJoker.indexOf(f);
};

export const getFullHouse = (hand: string): number => {
  const threes = findNumOfAKind(hand, 3);
  if (threes == null) {
    return 0;
  }
  const twos = findNumOfAKind(hand, 2, threes);
  if (twos == null) {
    return 0;
  }
  return hand
    .split("")
    .reduce((sum, item) => sum + strengthOrderWithJoker.indexOf(item), 0);
};

export const getTwoPair = (hand: string): number => {
  const firstPair = findNumOfAKind(hand, 2);
  if (firstPair == null) {
    return 0;
  }
  const secondPair = findNumOfAKind(hand, 2, firstPair);
  if (secondPair == null) {
    return 0;
  }
  return (
    strengthOrderWithJoker.indexOf(firstPair) +
    strengthOrderWithJoker.indexOf(secondPair)
  );
};

export const getPair = (hand: string): number => {
  const firstPair = findNumOfAKind(hand, 2);
  const secondPair = findNumOfAKind(hand, 2, firstPair);
  if (firstPair != null && secondPair != null) {
    return Math.max(
      strengthOrderWithJoker.indexOf(firstPair),
      strengthOrderWithJoker.indexOf(secondPair),
    );
  }
  if (firstPair != null) {
    return strengthOrderWithJoker.indexOf(firstPair);
  }
  if (secondPair != null) {
    return strengthOrderWithJoker.indexOf(secondPair);
  }
  return 0;
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
    const r =
      strengthOrderWithJoker.indexOf(bb) - strengthOrderWithJoker.indexOf(aa);
    if (r !== 0) {
      return r;
    }
  }
  return 0;
};
