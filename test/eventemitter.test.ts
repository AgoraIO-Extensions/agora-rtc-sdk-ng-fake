import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { FakeAgoraEventEmitter, dispatchRTCEvent } from "../src";

describe("FakeAgoraEventEmitter", () => {
  let eventEmitter: FakeAgoraEventEmitter;

  beforeEach(() => {
    eventEmitter = new FakeAgoraEventEmitter();
  });

  afterEach(() => {
    eventEmitter.removeAllListeners();
  });

  test("should add listener and trigger event", () => {
    const listener = vi.fn();
    eventEmitter.on("test", listener);
    eventEmitter.dispatch("test", "payload");

    expect(listener).toHaveBeenCalledWith("payload");
  });

  test("should add once listener and trigger event", () => {
    const listener = vi.fn();
    eventEmitter.once("test", listener);
    eventEmitter.dispatch("test", "payload");

    expect(listener).toHaveBeenCalledWith("payload");

    eventEmitter.dispatch("test", "payload");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("should remove listener", () => {
    const listener = vi.fn();
    eventEmitter.on("test", listener);
    eventEmitter.off("test", listener);
    eventEmitter.dispatch("test", "payload");

    expect(listener).not.toHaveBeenCalled();
  });

  test("should remove all listeners for a specific event", () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    eventEmitter.on("test", listener1);
    eventEmitter.on("test", listener2);
    eventEmitter.removeAllListeners("test");
    eventEmitter.dispatch("test", "payload");

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
  });

  test("should remove all listeners for all events", () => {
    const listener = vi.fn();
    eventEmitter.on("test1", listener);
    eventEmitter.on("test2", listener);
    eventEmitter.removeAllListeners();
    eventEmitter.dispatch("test1", "payload");
    eventEmitter.dispatch("test2", "payload");

    expect(listener).not.toHaveBeenCalled();
  });

  test("should dispatch event for a valid Agora event emitter", () => {
    const emitter = {
      dispatch: vi.fn(),
    };

    dispatchRTCEvent(emitter, "test", "payload");
    expect(emitter.dispatch).toHaveBeenCalledWith("test", "payload");
  });

  test("should not dispatch event for an invalid Agora event emitter", () => {
    const invalidEmitter = {
      test: vi.fn(),
    };

    dispatchRTCEvent(invalidEmitter, "test", "payload");
    expect(invalidEmitter.test).not.toHaveBeenCalled();
  });
});
