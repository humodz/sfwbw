export interface Point {
  x: number;
  y: number;
}

export function pointEquals(p1: Point, p2: Point) {
  return p1.x === p2.x && p1.y === p2.y;
}

export function pointAdd(p1: Point, p2: Point) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  };
}

export function pointToString(p: Point) {
  return `${p.x},${p.y}`;
}

export function pointFromString(text: string) {
  const [xRaw, yRaw] = text.split(',');
  return { x: Number(xRaw), y: Number(yRaw) };
}
