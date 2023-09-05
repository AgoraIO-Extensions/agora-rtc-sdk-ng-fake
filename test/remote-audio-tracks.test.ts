import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { FakeRemoteAudioTrackProps } from "../src";
import { FakeRemoteAudioTrack } from "../src";

describe("FakeRemoteAudioTrack", () => {
  let fakeRemoteAudioTrack: IRemoteAudioTrack;
  const props: FakeRemoteAudioTrackProps = {
    audioURI: "test.mp3",
    volume: 50,
  };

  beforeEach(() => {
    fakeRemoteAudioTrack = FakeRemoteAudioTrack.create(props);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should create a FakeRemoteAudioTrack instance", () => {
    expect(fakeRemoteAudioTrack).toBeInstanceOf(FakeRemoteAudioTrack);
  });

  test("should return valueOf when call valueOf", () => {
    expect(fakeRemoteAudioTrack.valueOf()).toBe("valueOf");
  });

  test("should return toString when call toString", () => {
    expect(fakeRemoteAudioTrack.toString()).toBe("toString");
  });

  test("should return toJSON when call toJSON", () => {
    expect(fakeRemoteAudioTrack["toJSON"]()).toBe("toJSON");
  });

  test("should return console when call setPlaybackDevice", () => {
    console.log = vi.fn();
    fakeRemoteAudioTrack.setPlaybackDevice("1");
    expect(console.log).toHaveBeenCalled();
  });

  test("should set default values if props are not provided", () => {
    const newFakeRemoteAudioTrack = FakeRemoteAudioTrack.create({
      audioURI: "keyboard.mp3",
      volume: 100,
    });
    expect(newFakeRemoteAudioTrack["_audioURI"]).toBe("keyboard.mp3");
    expect(newFakeRemoteAudioTrack["_volume"]).toBe(100);
  });

  test("should call play method correctly", () => {
    const audioEl = {
      src: "",
      volume: 0,
      play: vi.fn(),
      loop: false,
    };
    document.createElement = vi.fn().mockReturnValue(audioEl);
    document.body.appendChild = vi.fn();
    audioEl.play = vi.fn().mockReturnValue(Promise.resolve());
    fakeRemoteAudioTrack.play();

    expect(document.createElement).toHaveBeenCalledWith("audio");
    expect(audioEl.loop).toBe(true);
    expect(document.body.appendChild).toHaveBeenCalledWith(audioEl);
    expect(audioEl.src).toBe("test.mp3");
    expect(audioEl.volume).toBe(0.5);
    expect(audioEl.play).toHaveBeenCalled();
  });

  test("should call stop method correctly", () => {
    const audioEl = {
      pause: vi.fn(),
    };
    fakeRemoteAudioTrack["_audioEl"] = audioEl;
    fakeRemoteAudioTrack.isPlaying = true;

    fakeRemoteAudioTrack.stop();

    expect(audioEl.pause).toHaveBeenCalled();
    expect(fakeRemoteAudioTrack.isPlaying).toBe(false);
  });

  test("should call setVolume method correctly", () => {
    const audioEl = {
      volume: 0,
    };
    fakeRemoteAudioTrack["_audioEl"] = audioEl;

    fakeRemoteAudioTrack.setVolume(75);

    expect(audioEl.volume).toBe(0.75);
    expect(fakeRemoteAudioTrack["_volume"]).toBe(75);
  });

  test("should call getVolumeLevel method correctly", () => {
    fakeRemoteAudioTrack["_volume"] = 75;

    const volumeLevel = fakeRemoteAudioTrack.getVolumeLevel();

    expect(volumeLevel).toBe(0.75);
  });
});
