export type Up = "up";
export type Down = "down";
export type Left = "left";
export type Right = "right";
export type Direction = Up | Down | Left | Right;

export const directionToChar = (direction: Direction): string | undefined => {
  switch (direction) {
    case "down":
      return "v";
    case "up":
      return "^";
    case "left":
      return "<";
    case "right":
      return ">";
    default:
      return undefined;
  }
};
