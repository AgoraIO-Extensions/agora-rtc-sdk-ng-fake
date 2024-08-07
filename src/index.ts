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
export const FAKE_PLAYBACKINPUT_DEVICE_ID = "2";
export const FAKE_RECORDINGINPUT_DEVICE_ID = "3";

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
    return Promise.resolve([
      {
        kind: "videoinput",
        deviceId: FAKE_VIDEOINPUT_DEVICE_ID,
        label: FAKE_VIDEOINPUT_DEVICE_ID,
      },
    ] as MediaDeviceInfo[]);
  },
  getMicrophones(): Promise<MediaDeviceInfo[]> {
    return Promise.resolve([
      {
        kind: "audioinput",
        deviceId: FAKE_RECORDINGINPUT_DEVICE_ID,
        label: FAKE_RECORDINGINPUT_DEVICE_ID,
      },
    ] as MediaDeviceInfo[]);
  },
  getPlaybackDevices(): Promise<MediaDeviceInfo[]> {
    return Promise.resolve([
      {
        kind: "audiooutput",
        deviceId: FAKE_PLAYBACKINPUT_DEVICE_ID,
        label: FAKE_PLAYBACKINPUT_DEVICE_ID,
      },
    ] as MediaDeviceInfo[]);
  },
  getDevices(): Promise<MediaDeviceInfo[]> {
    return Promise.resolve([
      {
        kind: "videoinput",
        deviceId: FAKE_VIDEOINPUT_DEVICE_ID,
        label: FAKE_VIDEOINPUT_DEVICE_ID,
      },
      {
        kind: "audiooutput",
        deviceId: FAKE_PLAYBACKINPUT_DEVICE_ID,
        label: FAKE_PLAYBACKINPUT_DEVICE_ID,
      },
      {
        kind: "audioinput",
        deviceId: FAKE_RECORDINGINPUT_DEVICE_ID,
        label: FAKE_RECORDINGINPUT_DEVICE_ID,
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
