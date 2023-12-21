import { blaaa, Command, parseInput } from "./common.mjs";
import { Direction } from "../../common/location/Direction.ts";

export const getSolution = (input: string): number => {
  const commands = parseInput(input).map(convertCommand);
  return blaaa(commands);
};

export const convertCommand = (command: Command): Command => {
  const [, c] = command.color.split("#");
  const num = parseInt(c.substring(0, c.length - 1), 16);
  const direction = mapNumToDirection(c.substring(5));
  return {
    num,
    direction,
    color: "",
  };
};

export const mapNumToDirection = (num: string): Direction => {
  switch (num) {
    case "0":
      return Direction.Right;
    case "1":
      return Direction.Down;
    case "2":
      return Direction.Left;
    case "3":
      return Direction.Up;
    default:
      throw new Error("Illegal direction in command: " + num);
  }
};
