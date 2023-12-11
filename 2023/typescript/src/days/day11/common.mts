export type GalaxyMap = Array<GalaxyPosition>;

export interface GalaxyPosition {
  row: number;
  column: number;
}

export const parseGalaxyMap = (input: string): GalaxyMap => {
  const lines = input
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim());

  const map: GalaxyMap = [];

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "#") {
        map.push({ row: i, column: j });
      }
    }
  }

  return map;
};

export const countGalaxiesInColumn = (
  galaxyMap: GalaxyMap,
  column: number,
): number => galaxyMap.filter((g) => g.column === column).length;

export const countGalaxiesInRow = (galaxyMap: GalaxyMap, row: number): number =>
  galaxyMap.filter((g) => g.row === row).length;

export const totalDistanceBetweenAll = (
  galaxyMap: GalaxyMap,
  emptySpaceAdd: number,
): number => {
  let distance = 0;
  for (let i = 0; i < galaxyMap.length - 1; i++) {
    for (let j = i + 1; j < galaxyMap.length; j++) {
      distance += getDistance(
        galaxyMap[i],
        galaxyMap[j],
        galaxyMap,
        emptySpaceAdd,
      );
    }
  }
  return distance;
};

export const getDistance = (
  galaxyA: GalaxyPosition,
  galaxyB: GalaxyPosition,
  galaxyMap: GalaxyMap,
  emptySpaceAdd: number,
): number => {
  let travelled = 0;
  const startColumn = Math.min(galaxyA.column, galaxyB.column);
  const endColumn = Math.max(galaxyA.column, galaxyB.column);
  const startRow = Math.min(galaxyA.row, galaxyB.row);
  const endRow = Math.max(galaxyA.row, galaxyB.row);

  travelled += endColumn - startColumn;
  travelled += endRow - startRow;

  for (let current = startColumn; current <= endColumn; current++) {
    if (countGalaxiesInColumn(galaxyMap, current) === 0) {
      travelled += emptySpaceAdd;
    }
  }
  for (let current = startRow; current <= endRow; current++) {
    if (countGalaxiesInRow(galaxyMap, current) === 0) {
      travelled += emptySpaceAdd;
    }
  }
  return travelled;
};
