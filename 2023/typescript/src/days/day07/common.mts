export interface HandBid {
  hand: string;
  bid: number;
}

export const getMostCommonCard = (hand: string): string => {
  const numCardsPerType = hand.split("").reduce(
    (sum, item) => {
      sum[item] = sum[item] == null ? 1 : sum[item] + 1;
      return sum;
    },
    {} as Record<string, number>,
  );

  const cards = Object.keys(numCardsPerType);

  const r = cards.reduce<string | undefined>((sum, card) => {
    if (card === "J") {
      return sum;
    }
    if (sum == null) {
      return card;
    }
    if (numCardsPerType[card] > numCardsPerType[sum]) {
      return card;
    }
    return sum;
  }, undefined);

  return r == null ? "K" : r;
};

export const getFiveOfAKind = (hand: string, strengthOrder: string): number => {
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

export const getFourOfAKind = (hand: string, strengthOrder: string): number => {
  const f = findNumOfAKind(hand, 4);
  if (f == null) {
    return 0;
  }
  return strengthOrder.indexOf(f);
};

export const getThreeOfAKind = (
  hand: string,
  strengthOrder: string,
): number => {
  const f = findNumOfAKind(hand, 3);
  if (f == null) {
    return 0;
  }
  return strengthOrder.indexOf(f);
};

export const getFullHouse = (hand: string, strengthOrder: string): number => {
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

export const getTwoPair = (hand: string, strengthOrder: string): number => {
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

export const getPair = (hand: string, strengthOrder: string): number => {
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
  strengthOrder: string,
): { strength: number; type: string } => {
  const fiveOfAKind = getFiveOfAKind(hand, strengthOrder);
  if (fiveOfAKind) {
    return { strength: 7, type: "fiveOfAKind" };
  }
  const fourOfAKind = getFourOfAKind(hand, strengthOrder);
  if (fourOfAKind) {
    return { strength: 6, type: "fourOfAKind" };
  }
  const fullHouse = getFullHouse(hand, strengthOrder);
  if (fullHouse) {
    return { strength: 5, type: "fullHouse" };
  }
  const threeOfAKind = getThreeOfAKind(hand, strengthOrder);
  if (threeOfAKind) {
    return { strength: 4, type: "threeOfAKind" };
  }
  const twoPair = getTwoPair(hand, strengthOrder);
  if (twoPair) {
    return { strength: 2, type: "twoPair" };
  }
  const pair = getPair(hand, strengthOrder);
  if (pair) {
    return { strength: 1, type: "pair" };
  }

  return { strength: 0, type: "none" };
};

export const fromRowToHandBid = (row: string): HandBid => {
  const [hand, bidString] = row.split(" ");
  const bid = parseInt(bidString);
  return {
    hand,
    bid,
  };
};

export const byHandBidStrength =
  (strengthOrder: string) =>
  (a: HandBid, b: HandBid): number =>
    byHandStrength(strengthOrder)(a.hand, b.hand);

export const byHandStrength =
  (strengthOrder: string) =>
  (a: string, b: string): number => {
    const r =
      getHandStrength(b, strengthOrder).strength -
      getHandStrength(a, strengthOrder).strength;
    if (r === 0) {
      return byHandPrecedence(strengthOrder)(a, b);
    }
    return r;
  };

export const byHandPrecedence =
  (strengthOrder: string) =>
  (a: string, b: string): number => {
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
