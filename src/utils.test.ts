import { describe, test } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { assertSpyCalls, spy } from "@std/testing/mock";
import { NotOk, Ok } from "./types.ts";
import { mapNotOk, mapOk, resolve, tap, unwrap } from "./utils.ts";

describe("mapOk", () => {
  test("maps value of `OK`", () => {
    const ok = new Ok(13);
    const mapped = mapOk(ok, (n) => n + 10);
    assertEquals(mapped.value, 23);
  });
  test("does not map `NotOk`", () => {
    const notOk = new NotOk(13);
    const mapped = mapOk(notOk, (n) => n + 10);
    assertEquals(mapped.value, 13);
  });
});

describe("mapNotOk", () => {
  test("does not map value of `OK`", () => {
    const ok = new Ok(13);
    const mapped = mapNotOk(ok, (n) => n + 10);
    assertEquals(mapped.value, 13);
  });
  test("maps value of `NotOk`", () => {
    const notOk = new NotOk(13);
    const mapped = mapNotOk(notOk, (n) => n + 10);
    assertEquals(mapped.value, 23);
  });
});

describe("tap", () => {
  test("execute callback on `Ok`", () => {
    const ok = new Ok(13);
    const s = spy();
    tap(ok, s);
    assertSpyCalls(s, 1);
  });
  test("execute callback on `NotOk`", () => {
    const notOk = new NotOk(13);
    const s = spy();
    tap(notOk, s);
    assertSpyCalls(s, 1);
  });
});

describe("resolve", () => {
  test("returns `onOk` when `Ok` is passed", () => {
    const ok = new Ok(13);
    const onOk = spy(() => "ok");
    const onNotOk = spy(() => "not ok");
    const value = resolve(ok, onOk, onNotOk);

    assertEquals(value, "ok");
    assertSpyCalls(onOk, 1);
    assertSpyCalls(onNotOk, 0);
  });
  test("exectus `onNotOk` when `NotOk` is passed", () => {
    const ok = new NotOk(13);
    const onOk = spy(() => "ok");
    const onNotOk = spy(() => "not ok");
    const value = resolve(ok, onOk, onNotOk);

    assertEquals(value, "not ok");
    assertSpyCalls(onOk, 0);
    assertSpyCalls(onNotOk, 1);
  });
});

describe("unwrap", () => {
  test("returns `Ok` value", () => {
    assertEquals(unwrap(new Ok(12), 10), 12);
  });
  test("returns fallback value", () => {
    assertEquals(unwrap(new NotOk(12), 10), 10);
  });
});
