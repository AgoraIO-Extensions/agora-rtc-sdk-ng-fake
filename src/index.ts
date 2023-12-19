import type {
  IBufferSourceAudioTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  ScreenVideoTrackInitConfig,
} from "agora-rtc-sdk-ng";

import { FakeRTCClient } from "./client";
import { createFakeAgoraRTC } from "./top";
import { FakeCameraVideoTrack, FakeMicrophoneAudioTrack } from "./tracks";

export * from "./tracks";
export * from "./eventemitter";
export * from "./client";
export * from "./version";

export const FAKE_VIDEOINPUT_DEVICE_ID = "1";

const FakeAgoraRTC = createFakeAgoraRTC({
  setAppType(): void {
    //
  },
  setParameter(): void {
    //
  },
  setArea(): void {
    //
  },
  checkSystemRequirements(): boolean {
    return true;
  },
  setLogLevel(): void {
    //
  },
  getCameras(): Promise<MediaDeviceInfo[]> {
    //todo
    return Promise.resolve([
      {
        kind: "videoinput",
        deviceId: "1",
        label: "1",
      },
    ] as MediaDeviceInfo[]);
  },
  getDevices(): Promise<MediaDeviceInfo[]> {
    //todo
    return Promise.resolve([
      {
        kind: "videoinput",
        deviceId: FAKE_VIDEOINPUT_DEVICE_ID,
        label: "1",
      },
      {
        kind: "audiooutput",
        deviceId: "2",
        label: "2",
      },
      {
        kind: "audioinput",
        deviceId: "3",
        label: "3",
      },
    ] as MediaDeviceInfo[]);
  },
  createMicrophoneAudioTrack: async () => FakeMicrophoneAudioTrack.create(),
  createCameraVideoTrack: async () => FakeCameraVideoTrack.create(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  createScreenVideoTrack(
    _config: ScreenVideoTrackInitConfig,
    withAudio?: "enable" | "disable" | "auto",
  ): Promise<[ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack> {
    // 根据参数返回视频轨 或 [视频轨,音频轨]
    if (withAudio === "enable") {
      return Promise.resolve([
        FakeCameraVideoTrack.create() as ILocalVideoTrack,
        FakeMicrophoneAudioTrack.create() as ILocalAudioTrack,
      ]);
    } else if (withAudio === "disable") {
      return Promise.resolve(FakeCameraVideoTrack.create() as ILocalVideoTrack);
    } else {
      return Promise.resolve([
        FakeCameraVideoTrack.create() as ILocalVideoTrack,
        FakeMicrophoneAudioTrack.create() as ILocalAudioTrack,
      ]);
    }
  },
  createBufferSourceAudioTrack: async () =>
    FakeMicrophoneAudioTrack.create() as unknown as IBufferSourceAudioTrack,
  createCustomVideoTrack: () => FakeCameraVideoTrack.create(),
  createClient: () => FakeRTCClient.create(),
});

export function getFakeAgoraRTC() {
  return FakeAgoraRTC;
}

export const FakeAgoraRTCWrapper = {
  getFakeAgoraRTC: getFakeAgoraRTC,
};

export default FakeAgoraRTCWrapper;
