export interface RaceResult {
  time: number;
  distance: number;
}

export interface WinResult {
  chargeTime: number;
  distance: number;
}

export const getWins = (race: RaceResult): Array<WinResult> => {
  const wins = [] as Array<WinResult>;
  for (let chargeTime = 0; chargeTime < race.time; chargeTime++) {
    const distance = chargeTime * (race.time - chargeTime);
    if (distance > race.distance) {
      wins.push({ chargeTime, distance });
    }
  }

  return wins;
};
