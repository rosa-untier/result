/**
 * @module
 * @example
 * ```ts
 * const divide = (a,b) => {
 *   if (b <= 0) return new NotOk('cannot divide by 0')
 *   return new Ok(a / b)
 * }
 *
 * const value = unwrap(divide(10, 0), Infinity) // returns Infinity
 * ```
 */
export * from "./src/utils.ts";
export * from "./src/types.ts";
