export type CollatzResult = {
  start: number;
  sequence: number[]; // includes start and ends with 1
  loops: number; // number of transforms (sequence.length - 1)
};

export function computeCollatz(nIn: number): CollatzResult {
  if (!Number.isFinite(nIn) || nIn <= 0 || !Number.isInteger(nIn)) {
    throw new Error("input must be a positive integer");
  }
  const sequence: number[] = [];
  let number = nIn;
  sequence.push(number);
  while (number !== 1) {
    if (number % 2 === 0) {
      number = Math.floor(number / 2);
    } else {
      number = 3 * number + 1;
    }
    sequence.push(number);
    // safety: avoid infinite loop on pathological inputs (shouldn't happen for positive integers)
    if (sequence.length > 10000) {
      throw new Error("exceeded iteration limit");
    }
  }
  return {
    start: nIn,
    sequence,
    loops: sequence.length - 1,
  };
}
