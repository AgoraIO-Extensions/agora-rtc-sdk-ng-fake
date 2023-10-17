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

const FakeAgoraRTC = createFakeAgoraRTC({
  setAppType(): void {
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
    return Promise.resolve([]);
  },
  getDevices(): Promise<MediaDeviceInfo[]> {
    //todo
    return Promise.resolve([]);
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
