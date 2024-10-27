/** A union type of either `Ok` or `NotOk` */
export type Result<O, N> = Ok<O> | NotOk<N>;

class PrivateValue<T> {
  #value: T;
  constructor(value: T) {
    this.#value = value;
  }

  get value(): T {
    return this.#value;
  }
}

/** a simple data container for an `Ok` result */
export class Ok<O> extends PrivateValue<O> {}

/** a simple data container for a `NotOk` result */
export class NotOk<N> extends PrivateValue<N> {}
