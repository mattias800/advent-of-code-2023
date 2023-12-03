export const numbers = "0123456789";

export interface NumberInLine {
  value: string;
  start: number;
}

export type CharMatrix = Record<number, Record<number, boolean>>;

export interface Coordinate {
  column: number;
  line: number;
}
