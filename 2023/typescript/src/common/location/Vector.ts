export interface Vector {
  x: number;
  y: number;
  z: number;
}

export const addVectors = (a: Vector, b: Vector): Vector => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
  };
};

export const isVectorEqual = (a: Vector, b: Vector): boolean =>
  a.x === b.x && a.y === b.y && a.z === b.z;
