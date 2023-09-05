import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { FakeRTCClient, FakeRemoteAudioTrack, FakeRemoteVideoTrack } from "../src";

describe("FakeRTCClient", () => {
  let client: FakeRTCClient;

  beforeEach(() => {
    client = new FakeRTCClient();
  });

  test("should create an instance of FakeRTCClient", () => {
    expect(client).toBeInstanceOf(FakeRTCClient);
  });

  test("should have an empty array for remoteUsers", () => {
    expect(client.remoteUsers).toEqual([]);
  });

  describe("subscribe", () => {
    test("should subscribe to audio track if mediaType is 'audio' and user has no audio track", async () => {
      const user = {
        uid: "123",
        audioTrack: undefined,
        videoTrack: undefined,
      };
      const result = await client.subscribe(user as IAgoraRTCRemoteUser, "audio");
      expect(result).toBeInstanceOf(FakeRemoteAudioTrack);
      expect(user.audioTrack).toBe(result);
    });

    test("should subscribe to video track if mediaType is 'video' and user has no video track", async () => {
      const user = {
        uid: "123",
        audioTrack: undefined,
        videoTrack: undefined,
      };
      const result = await client.subscribe(user as IAgoraRTCRemoteUser, "video");
      expect(result).toBeInstanceOf(FakeRemoteVideoTrack);
      expect(user.videoTrack).toBe(result);
    });

    test("should return existing audio track if mediaType is 'audio' and user already has audio track", async () => {
      const audioTrack = FakeRemoteAudioTrack.create();
      const user = { uid: "123", audioTrack, videoTrack: undefined };
      user.audioTrack.setVolume = vi.fn();
      const result = await client.subscribe(user as IAgoraRTCRemoteUser, "audio");
      expect(result).toBe(audioTrack);
    });

    test("should return existing video track if mediaType is 'video' and user already has video track", async () => {
      const videoTrack = FakeRemoteVideoTrack.create();
      const user = { uid: "123", audioTrack: undefined, videoTrack };
      const result = await client.subscribe(user as IAgoraRTCRemoteUser, "video");
      expect(result).toBe(videoTrack);
    });
  });

  describe("unsubscribe", () => {
    test("should stop and reset audio track if mediaType is 'audio' and user has audio track", async () => {
      const audioTrack = FakeRemoteAudioTrack.create();
      const user = { uid: "123", audioTrack, videoTrack: undefined };
      user.audioTrack.stop = vi.fn();
      expect(user.audioTrack.stop).not.toHaveBeenCalled();
      client.unsubscribe(user as IAgoraRTCRemoteUser, "audio");
      expect(user.audioTrack).toBeUndefined();
    });

    test("should stop and reset video track if mediaType is 'video' and user has video track", async () => {
      const videoTrack = FakeRemoteVideoTrack.create();
      const user = { uid: "123", audioTrack: undefined, videoTrack };
      user.videoTrack.stop = vi.fn();
      expect(user.videoTrack.stop).not.toHaveBeenCalled();
      client.unsubscribe(user as IAgoraRTCRemoteUser, "video");
      expect(user.videoTrack).toBeUndefined();
    });

    test("should stop and reset both audio and video track if mediaType is undefined", async () => {
      const audioTrack = FakeRemoteAudioTrack.create();
      const videoTrack = FakeRemoteVideoTrack.create();
      const user = { uid: "123", audioTrack, videoTrack };
      user.audioTrack.stop = vi.fn();
      user.videoTrack.stop = vi.fn();
      expect(user.audioTrack.stop).not.toHaveBeenCalled();
      expect(user.videoTrack.stop).not.toHaveBeenCalled();
      client.unsubscribe(user as IAgoraRTCRemoteUser);
      expect(user.audioTrack).toBeUndefined();
      expect(user.videoTrack).toBeUndefined();
    });
  });

  describe("massUnsubscribe", () => {
    test("should unsubscribe each user individually with the specified mediaType", () => {
      const audioTrack = FakeRemoteAudioTrack.create();
      const videoTrack = FakeRemoteVideoTrack.create();
      const user1 = { uid: "123", audioTrack, videoTrack };
      const user2 = { uid: "456", audioTrack, videoTrack };
      client.unsubscribe = vi.fn();
      client.massUnsubscribe([user1 as IAgoraRTCRemoteUser, user2 as IAgoraRTCRemoteUser], "audio");
      expect(client.unsubscribe).toHaveBeenCalledTimes(2);
      expect(client.unsubscribe).toHaveBeenCalledWith(user1, "audio");
      expect(client.unsubscribe).toHaveBeenCalledWith(user2, "audio");
    });
  });

  describe("join", () => {
    test("should return a promise that resolves with a generated UID", async () => {
      const result = await client.join();
      expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });

  describe("leave", () => {
    test("should return a promise that resolves with undefined", async () => {
      const result = await client.leave();
      expect(result).toBeUndefined();
    });
  });
});
