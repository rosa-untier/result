import { NotOk, Ok, type Result } from "./types.ts";

/** apply callback on results value only if it's an instance of `Ok` */
export const mapOk = <O, N, R>(
  res: Result<O, N>,
  cb: (value: O) => R,
): Result<R, N> => {
  if (res instanceof Ok) return new Ok(cb(res.value));
  return res;
};

/** apply callback on results value only if it's an instance of `NotOk` */
export const mapNotOk = <O, N, R>(
  res: Result<O, N>,
  cb: (value: N) => R,
): Result<O, R> => {
  if (res instanceof NotOk) return new NotOk(cb(res.value));
  return res;
};

/** execute a callback on the result */
export const tap = <O, N>(
  res: Result<O, N>,
  cb: (r: typeof res) => void,
): void => cb(res);

/** returns a value no matter if result is `Ok` or `NotOk` */
export const resolve = <O, N, R>(
  res: Result<O, N>,
  onOk: (value: O) => R,
  onNotOk: (value: N) => R,
): R => {
  if (res instanceof Ok) return onOk(res.value);
  return onNotOk(res.value);
};

/** in case of `NotOk` return the fallback value, else the `Ok` value */
export const unwrap = <O>(res: Result<O, unknown>, fallback: O): O => {
  if (res instanceof NotOk) return fallback;
  return res.value;
};
