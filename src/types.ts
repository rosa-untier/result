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

export class Ok<O> extends PrivateValue<O> {}

export class NotOk<N> extends PrivateValue<N> {}
