export function UUID(blocks = 4): string {
  const arr: number[] = Array(blocks).fill(0);
  return arr.map(() => Math.floor(Math.random() * 1000000))
    .map(v => v.toString(16).toUpperCase())
    .join('-');
}