import { getAsciiHash } from "./common.mjs";

export const getSolution = (input: string): number => {
  const list = input
    .trim()
    .split(",")
    .filter((p) => p)
    .map((p) => p.trim());

  const boxes = createEmptyBoxes();

  for (let i = 0; i < list.length; i++) {
    process(list[i], boxes);
  }

  return countFocalPower(boxes);
};

const process = (item: string, boxes: Array<Box>) => {
  const [label, focal] = item.replaceAll("-", "").split("=");
  const hash = getAsciiHash(label);

  if (!focal) {
    boxes[hash].lenses = boxes[hash].lenses.filter((l) => l.label !== label);
  } else {
    const index = boxes[hash].lenses.findIndex((p) => p.label === label);
    const focalLength = parseInt(focal, 10);
    if (index < 0) {
      boxes[hash].lenses.push({ label, focalLength });
    } else {
      boxes[hash].lenses[index].focalLength = focalLength;
    }
  }
};

const countFocalPower = (boxes: Array<Box>): number =>
  boxes.reduce((sum, item, index) => sum + countBoxFocalPower(item, index), 0);

const countBoxFocalPower = (box: Box, boxIndex: number): number =>
  box.lenses.reduce(
    (sum, item, slotIndex) =>
      sum + (boxIndex + 1) * (slotIndex + 1) * item.focalLength,
    0,
  );

const createEmptyBoxes = (): Array<Box> =>
  Array(256)
    .fill(null)
    .map<Box>(() => ({ lenses: [] }));

interface Box {
  lenses: Array<Lens>;
}

interface Lens {
  label: string;
  focalLength: number;
}
