interface MirrorMap {
  rows: Array<string>;
}

export const parseInput = (input: string): Array<MirrorMap> =>
  input.split("\n\n").map(parseMapInput);

export const parseMapInput = (input: string): MirrorMap => ({
  rows: input.split("\n"),
});

export const findVerticalMirrorLine = (map: MirrorMap): number | undefined => {
  main: for (let i = 0; i < map.rows[0].length - 1; i++) {
    if (columnsAreEqual(map, i, i + 1)) {
      for (let c = 0; c < i; c++) {
        const offset = i - c;
        if (!columnsAreEqual(map, c, i + 1 + offset)) {
          continue main;
        }
      }
      return i;
    }
  }
  return undefined;
};

export const columnsAreEqual = (
  map: MirrorMap,
  columnA: number,
  columnB: number,
): boolean => {
  for (let i = 0; i < map.rows.length; i++) {
    if (
      map.rows[i].charAt(columnB) &&
      map.rows[i].charAt(columnA) !== map.rows[i].charAt(columnB)
    ) {
      return false;
    }
  }
  return true;
};

export const findHorizontalMirrorLine = (
  map: MirrorMap,
): number | undefined => {
  main: for (let i = 0; i < map.rows.length - 1; i++) {
    if (map.rows[i] === map.rows[i + 1]) {
      for (let c = 0; c < i; c++) {
        const offset = i - c;
        if (
          map.rows[c] !== map.rows[i + 1 + offset] &&
          map.rows[i + 1 + offset] != null
        ) {
          continue main;
        }
      }
      return i;
    }
  }
  return undefined;
};
