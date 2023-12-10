export const strengthOrder = "x23456789TJQKA";
export const strengthOrderWithJoker = "J23456789TQKA";

export interface HandBid {
  hand: string;
  bid: number;
}

const findFirstNonJoker = (hand: string): string => {
  for (let i = 1; i < hand.length; i++) {
    if (hand[i] !== "J") {
      return hand[i];
    }
  }
  throw new Error("Only jokers in hand.");
};

export const getFiveOfAKind = (hand: string): number => {
  for (let i = 1; i < hand.length; i++) {
    if (hand[0] !== hand[i]) {
      return 0;
    }
  }
  return strengthOrder.indexOf(hand[0]);
};

export const findNumOfAKind = (
  hand: string,
  num: number,
  excludeChar?: string,
): string | undefined => {
  for (let i = 0; i < hand.length; i++) {
    const current = hand[i];
    let counter = 0;
    if (excludeChar && current === excludeChar) {
      continue;
    }
    for (let j = 0; j < hand.length; j++) {
      if (current === hand[j]) {
        counter++;
        if (counter >= num) {
          return current;
        }
      }
    }
  }
  return undefined;
};

export const getFourOfAKind = (hand: string): number => {
  const f = findNumOfAKind(hand, 4);
  if (f == null) {
    return 0;
  }
  return strengthOrder.indexOf(f);
};

export const getThreeOfAKind = (hand: string): number => {
  const f = findNumOfAKind(hand, 3);
  if (f == null) {
    return 0;
  }
  return strengthOrder.indexOf(f);
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
    .reduce((sum, item) => sum + strengthOrder.indexOf(item), 0);
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
  return strengthOrder.indexOf(firstPair) + strengthOrder.indexOf(secondPair);
};

export const getPair = (hand: string): number => {
  const firstPair = findNumOfAKind(hand, 2);
  const secondPair = findNumOfAKind(hand, 2, firstPair);
  if (firstPair != null && secondPair != null) {
    return Math.max(
      strengthOrder.indexOf(firstPair),
      strengthOrder.indexOf(secondPair),
    );
  }
  if (firstPair != null) {
    return strengthOrder.indexOf(firstPair);
  }
  if (secondPair != null) {
    return strengthOrder.indexOf(secondPair);
  }
  return 0;
};

export const getHandStrength = (
  hand: string,
): { strength: number; type: string } => {
  const fiveOfAKind = getFiveOfAKind(hand);
  if (fiveOfAKind) {
    return { strength: 700 + fiveOfAKind, type: "fiveOfAKind" };
  }
  const fourOfAKind = getFourOfAKind(hand);
  if (fourOfAKind) {
    return { strength: 600 + fourOfAKind, type: "fourOfAKind" };
  }
  const fullHouse = getFullHouse(hand);
  if (fullHouse) {
    return { strength: 500 + fullHouse, type: "fullHouse" };
  }
  const threeOfAKind = getThreeOfAKind(hand);
  if (threeOfAKind) {
    return { strength: 400 + threeOfAKind, type: "threeOfAKind" };
  }
  const twoPair = getTwoPair(hand);
  if (twoPair) {
    return { strength: 200 + twoPair, type: "twoPair" };
  }
  const pair = getPair(hand);
  if (pair) {
    return { strength: 100 + pair, type: "pair" };
  }

  return { strength: 0, type: "none" };
};

export const byStrength = (a: string, b: string): number =>
  getHandStrength(b).strength - getHandStrength(a).strength;

export const byHandBidStrengthWeakFirst = (a: HandBid, b: HandBid): number =>
  getHandStrength(a.hand).strength - getHandStrength(b.hand).strength;

export const fromRowToHandBid = (row: string): HandBid => {
  const [hand, bidString] = row.split(" ");
  const bid = parseInt(bidString);
  return {
    hand,
    bid,
  };
};
