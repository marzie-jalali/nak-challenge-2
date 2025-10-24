export function getFibonacciNeighbors(num: number): {
  prev: number;
  next: number;
} {
  if (!Number.isFinite(num) || num < 0)
    throw new Error("num must be a non-negative number");

  // special-case num = 0
  if (num === 0) return { prev: 0, next: 1 };

  let a = 0;
  let b = 1;

  // generate until b >= num
  while (b < num) {
    const c = a + b;
    a = b;
    b = c;
  }
  // now b >= n, and a is previous fib (could be equal if n is fib and equals a or b)
  if (b === num) {
    // n is Fibonacci and equals b
    // prev should be n (per spec examples like 1 => 1,2 and 13 => 13,21)
    // next is next Fibonacci
    const next = a + b;
    return { prev: num, next };
  }
  // otherwise b > n, a < = previous fib
  return { prev: a, next: b };
}
