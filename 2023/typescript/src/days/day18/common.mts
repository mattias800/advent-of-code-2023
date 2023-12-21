import { Direction } from "../../common/location/Direction.ts";
import {
  addPosition,
  BoundingBox,
  extendBoundingBoxWithPosition,
  Position,
} from "../../common/location/Position.ts";
import { dl } from "../../common/log/Log.ts";
import { range } from "lodash";

export interface Command {
  direction: Direction;
  num: number;
  color: string;
}

export interface Line {
  start: Position;
  end: Position;
}

export const parseInput = (input: string): Array<Command> =>
  input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim())
    .map(parseLine);

export const parseLine = (line: string): Command => {
  const [dir, numString, colorString] = line.split(" ");
  return {
    direction: charToDirection(dir),
    num: parseInt(numString),
    color: colorString.substring(1, colorString.length - 1),
  };
};

export const charToDirection = (char: string): Direction => {
  switch (char) {
    case "U":
      return Direction.Up;
    case "R":
      return Direction.Right;
    case "D":
      return Direction.Down;
    case "L":
      return Direction.Left;
    default:
      throw new Error("Invalid direction character.");
  }
};

export const commandToVector = (command: Command): Position => {
  switch (command.direction) {
    case Direction.Up:
      return { column: 0, row: -command.num };
    case Direction.Down:
      return { column: 0, row: command.num };
    case Direction.Left:
      return { column: -command.num, row: 0 };
    case Direction.Right:
      return { column: command.num, row: 0 };
  }
};

export const createLines = (commands: Array<Command>): Array<Line> => {
  const { lines } = commands.reduce(
    (sum, command) => {
      const directionVector = commandToVector(command);

      const end = addPosition(sum.prevPosition, directionVector);
      const line: Line = {
        start: sum.prevPosition,
        end,
      };
      sum.prevPosition = end;
      sum.lines.push(line);

      return sum;
    },
    { prevPosition: { row: 0, column: 0 }, lines: [] as Array<Line> },
  );

  return lines;
};

const getBoundingBox = (lines: Array<Line>): BoundingBox =>
  lines.reduce((sum, item) => extendBoundingBoxWithPosition(sum, item.end), {
    minColumn: 0,
    maxColumn: 0,
    minRow: 0,
    maxRow: 0,
  });

interface RaycastResult {
  hit: boolean;
  hitColumn: number;
  distance: number;
  line: Line | undefined;
  lineIndex: number | undefined;
}

export const intersectsAnyLine = (
  position: Position,
  lines: Array<Line>,
): boolean => {
  for (let i = 0; i < lines.length; i++) {
    if (intersectsLine(position, lines[i])) {
      return true;
    }
  }
  return false;
};

export const intersectsLine = (position: Position, line: Line): boolean => {
  const l = positiveLine(line);

  return (
    position.column >= l.start.column &&
    position.column <= l.end.column &&
    position.row >= l.start.row &&
    position.row <= l.end.row
  );
};

export const positiveLine = (line: Line): Line => {
  const startColumn = Math.min(line.start.column, line.end.column);
  const endColumn = Math.max(line.start.column, line.end.column);
  const startRow = Math.min(line.start.row, line.end.row);
  const endRow = Math.max(line.start.row, line.end.row);

  return {
    start: {
      column: startColumn,
      row: startRow,
    },
    end: {
      column: endColumn,
      row: endRow,
    },
  };
};

export const getRaycastHit = (
  rayStart: Position,
  lines: Array<Line>,
  maxColumn: number,
): RaycastResult => {
  for (let column = rayStart.column; column <= maxColumn; column++) {
    const current = {
      column,
      row: rayStart.row,
    };
    for (let i = 0; i < lines.length; i++) {
      if (intersectsLine(current, lines[i])) {
        return {
          hit: true,
          hitColumn: current.column,
          distance: current.column - rayStart.column,
          line: lines[i],
          lineIndex: i,
        };
      }
    }
  }
  return {
    hit: false,
    hitColumn: -1,
    distance: -1,
    line: undefined,
    lineIndex: undefined,
  };
};

export const countDigsInAllRows = (lines: Array<Line>): number => {
  const boundingBox = getBoundingBox(lines);
  console.log("boundingBox: " + JSON.stringify(boundingBox));
  let result = 0;
  for (let row = boundingBox.minRow; row <= boundingBox.maxRow; row++) {
    console.log("-------------------------");
    console.log("countDigsInRow row=" + row);
    const r = countDigsInRow(row, boundingBox, lines);
    console.log("Found digs: " + r);
    result += r;
  }
  return result;
};

export const countDigsInRow = (
  row: number,
  boundingBox: BoundingBox,
  lines: Array<Line>,
): number => {
  let numDigs = 0;

  let column = boundingBox.minColumn;
  let isInside = false;

  for (let i = 0; i < lines.length * 2; i++) {
    const log = (s: string) => dl(i, s);
    const addNumDigs = (n: number, label: string) => {
      numDigs += n;
      log("<> addNumDigs " + n + " : " + label);
    };

    log(
      "iteration " +
        i +
        " starts with numDigs=" +
        numDigs +
        " column=" +
        column,
    );
    // We never need to raycast more than once per line.
    if (column > boundingBox.maxColumn) {
      return numDigs;
    }

    const { hit, line, hitColumn, distance } = getRaycastHit(
      { row, column },
      lines,
      boundingBox.maxColumn,
    );

    if (!hit || line == null) {
      log("No raycast hit!");
      return numDigs;
    }

    log("-- Hit! Current column: " + column);
    log("hitColumn=" + hitColumn);
    log("distance=" + distance);

    if (isInside) {
      addNumDigs(distance, "empty inside space");
      column = hitColumn;
      isInside = !isInside;
      continue;
    }

    const hasLineAbove = intersectsAnyLine(
      { row: row - 1, column: hitColumn },
      lines,
    );

    const hasLineBelow = intersectsAnyLine(
      { row: row + 1, column: hitColumn },
      lines,
    );

    if (hasLineAbove && hasLineBelow) {
      log("Has line above and below");

      const insideRay = getRaycastHit(
        { row, column: hitColumn + 1 },
        lines,
        boundingBox.maxColumn,
      );

      addNumDigs(1, "|");

      if (!isInside && insideRay.hit) {
        column = insideRay.hitColumn;
        addNumDigs(insideRay.distance, "empty space after |");
      } else {
        column++;
      }
    } else if (hasLineAbove || hasLineBelow) {
      log("ooh a corner");

      const nextEmptyColumn = findNextEmptyColumn(
        { row, column: hitColumn + 1 },
        boundingBox,
        lines,
      );

      if (nextEmptyColumn == null) {
        log("Did not find an empty column again, row: " + row);
        addNumDigs(
          boundingBox.maxColumn - hitColumn + 1,
          "corner line reached end",
        );

        return numDigs;
      }

      const lineSize = nextEmptyColumn - column;
      log("lineSize=" + lineSize);
      log("found corner end, column=" + nextEmptyColumn);

      addNumDigs(lineSize, "");

      const lastHitHasLineAbove = intersectsAnyLine(
        { row: row - 1, column: nextEmptyColumn - 1 },
        lines,
      );

      const lastHitHasLineBelow = intersectsAnyLine(
        { row: row + 1, column: nextEmptyColumn - 1 },
        lines,
      );

      if (
        (hasLineAbove && lastHitHasLineBelow) ||
        (hasLineBelow && lastHitHasLineAbove)
      ) {
        isInside = !isInside;
        log("toggle isInside=" + isInside);
      }
      column = nextEmptyColumn;
    } else {
      throw new Error("Nothing above or below. This should never happen.");
    }
  }

  return numDigs;
};

export const findNextEmptyColumn = (
  position: Position,
  boundingBox: BoundingBox,
  lines: Array<Line>,
): number | undefined => {
  for (let i = position.column + 1; i <= boundingBox.maxColumn; i++) {
    if (!intersectsAnyLine({ row: position.row, column: i }, lines)) {
      return i;
    }
  }
  return undefined;
};

const getNumSteps = (commands: Array<Command>): number =>
  commands.reduce((sum, c) => sum + c.num, 0);

export const blaaa = (commands: Array<Command>): number => {
  const lines = createLines(commands);

  let b = getNumSteps(commands);

  const points = [
    { row: 0, column: 0 },
    ...lines.map((l) => {
      return l.end;
    }),
  ];

  const a =
    Math.abs(
      range(0, lines.length).reduce((sum, i) => {
        return (
          sum +
          points[i].row *
            (points[(i - 1 + points.length) % points.length].column -
              points[(i + 1 + points.length) % points.length].column)
        );
      }, 0),
    ) / 2;

  const i = a - b / 2 + 1;
  return i + b;
};
