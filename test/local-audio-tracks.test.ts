import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { FakeLocalAudioTrack } from "../src";

describe("FakeLocalAudioTrack", () => {
  let fakeLocalAudioTrack: ILocalAudioTrack;

  beforeEach(() => {
    fakeLocalAudioTrack = FakeLocalAudioTrack.create();
  });

  afterEach(() => {
    fakeLocalAudioTrack.stop();
  });

  describe("constructor", () => {
    test("should create instance of FakeLocalAudioTrack", () => {
      expect(fakeLocalAudioTrack).toBeInstanceOf(FakeLocalAudioTrack);
    });

    test("should set default volume", () => {
      expect(fakeLocalAudioTrack.getVolumeLevel()).toBe(1);
    });

    test("should set audioURI", () => {
      expect(
        fakeLocalAudioTrack["_audioURI"].indexOf("quick-mechanical-keyboard-14391.mp3") !== -1,
      ).toBe(true);
    });

    test("should set muted property", () => {
      expect(fakeLocalAudioTrack.muted).toBe(false);
    });
  });

  describe("play", () => {
    test("should set src and volume of the audio element", () => {
      fakeLocalAudioTrack.play();

      expect(
        fakeLocalAudioTrack["_audioEl"].src.indexOf("quick-mechanical-keyboard-14391.mp3") !== -1,
      ).toBe(true);
      expect(fakeLocalAudioTrack["_audioEl"].volume).toBe(1);
    });

    test("should play the audio element", () => {
      fakeLocalAudioTrack.play();

      expect(fakeLocalAudioTrack.isPlaying).toBe(true);
      expect(fakeLocalAudioTrack["_audioEl"].play).toHaveBeenCalled();
    });
  });

  describe("stop", () => {
    beforeEach(() => {
      fakeLocalAudioTrack.play();
    });

    test("should pause the audio element", () => {
      fakeLocalAudioTrack.stop();

      expect(fakeLocalAudioTrack.isPlaying).toBe(false);
      expect(fakeLocalAudioTrack["_audioEl"].pause).toHaveBeenCalled();
    });
  });

  describe("setMuted", () => {
    beforeEach(() => {
      fakeLocalAudioTrack.play();
    });

    test("should set the muted property of the audio element", () => {
      fakeLocalAudioTrack.setMuted(true);

      expect(fakeLocalAudioTrack["_audioEl"].muted).toBe(true);
    });
  });

  describe("setVolume", () => {
    beforeEach(() => {
      fakeLocalAudioTrack.play();
    });

    test("should set the volume of the audio element", () => {
      fakeLocalAudioTrack.setVolume(50);

      expect(fakeLocalAudioTrack["_audioEl"].volume).toBe(0.5);
    });
  });

  describe("getVolumeLevel", () => {
    test("should return the volume level", () => {
      fakeLocalAudioTrack.setVolume(75);

      expect(fakeLocalAudioTrack.getVolumeLevel()).toBe(0.75);
    });
  });

  describe("setPlaybackDevice", () => {
    test("should log the device ID", () => {
      const consoleSpy = vi.spyOn(console, "log");
      const deviceId = "123456";

      fakeLocalAudioTrack.setPlaybackDevice(deviceId);

      expect(consoleSpy).toHaveBeenCalledWith("[FakeLocalAudioTrack]: setPlaybackDevice", deviceId);
    });
  });
});
