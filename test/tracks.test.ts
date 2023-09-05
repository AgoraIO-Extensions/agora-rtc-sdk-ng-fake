import { randUuid } from "@ngneat/falso";
import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { FakeTrackProps } from "../src";
import { FakeTrack } from "../src";

vi.mock("@ngneat/falso");

describe("FakeTrack", () => {
  beforeEach(() => {
    (randUuid as Mock).mockReturnValue("trackId");
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("create", () => {
    test("should create a new FakeTrack instance", () => {
      const props: FakeTrackProps = { trackMediaType: "audio", trackId: "customTrackId" };

      const track = FakeTrack.create(props);

      expect(track).toBeInstanceOf(FakeTrack);
      expect(track.trackMediaType).toBe("audio");
      expect(track["_trackId"]).toBe("customTrackId");
      expect(randUuid).not.toBeCalled();
    });

    test("should create a new FakeTrack instance with default props", () => {
      const track = FakeTrack.create();

      expect(track).toBeInstanceOf(FakeTrack);
      expect(track.trackMediaType).toBe("video");
      expect(track["_trackId"]).toBe("trackId");
      expect(randUuid).toBeCalled();
    });
  });

  describe("constructor", () => {
    test("should initialize the trackMediaType and _trackId", () => {
      const props: FakeTrackProps = { trackMediaType: "audio", trackId: "customTrackId" };

      const track = FakeTrack.create(props);

      expect(track.trackMediaType).toBe("audio");
      expect(track["_trackId"]).toBe("customTrackId");
      expect(randUuid).not.toBeCalled();
    });

    test("should initialize the trackMediaType with default value and generate _trackId", () => {
      const track = FakeTrack.create();

      expect(track.trackMediaType).toBe("video");
      expect(track["_trackId"]).toBe("trackId");
      expect(randUuid).toBeCalled();
    });
  });

  describe("getTrackId", () => {
    test("should return the _trackId", () => {
      const track = FakeTrack.create();

      expect(track.getTrackId()).toBe("trackId");
    });
  });

  describe("getMediaStreamTrack", () => {
    test("should throw an error", () => {
      const track = FakeTrack.create();

      expect(() => {
        track.getMediaStreamTrack();
      }).toThrowError("Method not implemented.");
    });
  });

  describe("play", () => {
    test("should set isPlaying to true and log play message with element", () => {
      const track = FakeTrack.create();

      console.log = vi.fn();

      track.play("element");

      expect(track.isPlaying).toBe(true);
      expect(console.log).toBeCalledWith("[FakeTrack]: play", "element");
    });

    test("should set isPlaying to true and log play message without element", () => {
      const track = FakeTrack.create();

      console.log = vi.fn();

      track.play();

      expect(track.isPlaying).toBe(true);
      expect(console.log).toBeCalledWith("[FakeTrack]: play", undefined);
    });
  });

  describe("stop", () => {
    test("should set isPlaying to false", () => {
      const track = FakeTrack.create();

      track.stop();

      expect(track.isPlaying).toBe(false);
    });
  });
});
