export interface MirrorMap {
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

export const findMirrorRowWithMismatch = (
  map: MirrorMap,
  requiredNumMismatches: number,
): number | undefined => {
  for (let i = 0; i < map.rows.length - 1; i++) {
    console.log("testing row: " + i);
    if (testMirrorRowForMismatch(map, i, requiredNumMismatches)) {
      return i;
    }
  }
  return undefined;
};

export const testMirrorRowForMismatch = (
  map: MirrorMap,
  line: number,
  requiredNumMismatches: number,
): boolean => {
  let totalNumMismatches = 0;
  for (let i = 0; i <= line; i++) {
    const rowB = line + 1 + line - i;
    console.log("   comparing rows " + i + ":" + rowB);
    totalNumMismatches += numMismatchesBetweenRows(map, i, rowB);
    if (totalNumMismatches > requiredNumMismatches) {
      console.log("bailing, too many mismatches: " + totalNumMismatches);
      return false;
    }
  }
  return totalNumMismatches === requiredNumMismatches;
};

export const findMirrorColumnWithMismatch = (
  map: MirrorMap,
  requiredNumMismatches: number,
): number | undefined => {
  console.log("OK LETS GO MAP");
  console.log(map);
  for (let i = 0; i < map.rows[0].length - 1; i++) {
    console.log("testing column: " + i);
    if (testMirrorColumnForMismatch(map, i, requiredNumMismatches)) {
      return i;
    }
  }
  return undefined;
};

export const testMirrorColumnForMismatch = (
  map: MirrorMap,
  column: number,
  requiredNumMismatches: number,
): boolean => {
  let totalNumMismatches = 0;
  for (let i = 0; i <= column; i++) {
    const columnB = column + 1 + column - i;
    console.log("   comparing columns " + i + ":" + columnB);
    totalNumMismatches += numMismatchesBetweenColumns(map, i, columnB);
    if (totalNumMismatches > requiredNumMismatches) {
      console.log("bailing, too many mismatches: " + totalNumMismatches);
      return false;
    }
  }
  return totalNumMismatches === requiredNumMismatches;
};

export const numMismatchesBetweenColumns = (
  map: MirrorMap,
  columnA: number,
  columnB: number,
): number => {
  let mismatches = 0;

  for (let i = 0; i < map.rows.length; i++) {
    if (
      columnB < map.rows[i].length &&
      map.rows[i].charAt(columnA) !== map.rows[i].charAt(columnB)
    ) {
      mismatches++;
    }
  }

  return mismatches;
};

export const numMismatchesBetweenRows = (
  map: MirrorMap,
  rowA: number,
  rowB: number,
): number => {
  let mismatches = 0;

  for (let i = 0; i < map.rows[rowA].length; i++) {
    if (
      map.rows[rowB] &&
      map.rows[rowA].charAt(i) !== map.rows[rowB].charAt(i)
    ) {
      mismatches++;
    }
  }

  console.log("num mismatches: " + mismatches);
  return mismatches;
};

export const calculateSolution = (maps: Array<MirrorMap>): number => {
  const verticals = maps
    .map((m) => findVerticalMirrorLine(m))
    .map((p) => (p != null ? p + 1 : 0))
    .reduce((sum, item) => sum + item, 0);

  const horizontals = maps
    .map((m) => findHorizontalMirrorLine(m))
    .map((p) => (p != null ? (p + 1) * 100 : 0))
    .reduce((sum, item) => sum + item, 0);

  return verticals + horizontals;
};

export const calculateSolutionWithMismatch = (
  maps: Array<MirrorMap>,
  requiredNumMismatch: number,
): number => {
  const verticals = maps
    .map((m) => findMirrorColumnWithMismatch(m, requiredNumMismatch))
    .map((p) => (p != null ? p + 1 : 0))
    .reduce((sum, item) => sum + item, 0);

  const horizontals = maps
    .map((m) => findMirrorRowWithMismatch(m, requiredNumMismatch))
    .map((p) => (p != null ? (p + 1) * 100 : 0))
    .reduce((sum, item) => sum + item, 0);

  return verticals + horizontals;
};
