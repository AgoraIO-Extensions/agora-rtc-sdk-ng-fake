import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { FakeRemoteVideoTrack } from "../src";

describe("FakeRemoteVideoTrack", () => {
  let fakeRemoteVideoTrack: IRemoteVideoTrack;

  beforeEach(() => {
    fakeRemoteVideoTrack = FakeRemoteVideoTrack.create();
    document.body.innerHTML = '<div id="container"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should play the video track", () => {
    fakeRemoteVideoTrack.play("container");

    const videoElement = document.querySelector("#container video");

    expect((<HTMLVideoElement>videoElement).src.indexOf("ipad-2988.mp4") !== -1).toBe(true);
    expect((<HTMLVideoElement>videoElement).style.opacity).toBe("1");
    expect(fakeRemoteVideoTrack.isPlaying).toBe(true);
  });

  test("should stop playing the video track", () => {
    fakeRemoteVideoTrack.play("container");
    fakeRemoteVideoTrack.stop();

    const videoElement = document.querySelector("#container video");

    expect((<HTMLVideoElement>videoElement).style.opacity).toBe("0");
    expect(fakeRemoteVideoTrack.isPlaying).toBe(false);
  });
});
