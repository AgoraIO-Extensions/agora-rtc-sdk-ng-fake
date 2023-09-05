import type { ILocalVideoTrack, VideoPlayerConfig } from "agora-rtc-sdk-ng";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { FakeLocalVideoTrack } from "../src/tracks";

describe("FakeLocalVideoTrack", () => {
  let fakeLocalVideoTrack: ILocalVideoTrack;

  beforeEach(() => {
    fakeLocalVideoTrack = FakeLocalVideoTrack.create();
  });

  test("create method returns an instance of FakeLocalVideoTrack", () => {
    const track = FakeLocalVideoTrack.create();
    expect(track).toBeInstanceOf(FakeLocalVideoTrack);
  });

  test("play method sets video source and appends video element to container", () => {
    const containerMock = document.createElement("div");
    const videoElMock = document.createElement("video");
    videoElMock.play = vi.fn().mockReturnValue(Promise.resolve());
    vi.spyOn(document, "getElementById").mockReturnValue(containerMock);
    vi.spyOn(document, "createElement").mockReturnValue(videoElMock);
    vi.spyOn(containerMock, "appendChild");

    const element = "containerId";
    const config: VideoPlayerConfig = {
      fit: "cover",
    };

    fakeLocalVideoTrack.play(element, config);

    expect(fakeLocalVideoTrack["_videoURI"].indexOf("ipad-2988.mp4") !== -1).toBe(true);
    expect(fakeLocalVideoTrack["_config"]).toBe(config);
    expect(document.getElementById).toHaveBeenCalledWith(element);
    expect(document.createElement).toHaveBeenCalledWith("video");
    expect(containerMock.appendChild).toHaveBeenCalledWith(videoElMock);
    expect(videoElMock.src.indexOf("ipad-2988.mp4") !== -1).toBe(true);
    expect(videoElMock.style.objectFit).toBe("cover");
    expect(videoElMock.style.opacity).toBe("1");
    expect(videoElMock.play).toHaveBeenCalled();
  });

  test("stop method pauses video element and sets opacity to 0", () => {
    const videoElMock = document.createElement("video");
    videoElMock.pause = vi.fn();
    fakeLocalVideoTrack["_videoEl"] = videoElMock;
    fakeLocalVideoTrack["isPlaying"] = true;

    fakeLocalVideoTrack.stop();

    expect(videoElMock.pause).toHaveBeenCalled();
    expect(videoElMock.style.opacity).toBe("0");
    expect(fakeLocalVideoTrack["isPlaying"]).toBe(false);
  });
});
