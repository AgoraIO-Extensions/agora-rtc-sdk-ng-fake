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
  createMicrophoneAudioTrack: async () => FakeMicrophoneAudioTrack.create(),
  createCameraVideoTrack: async () => FakeCameraVideoTrack.create(),
  createClient: () => FakeRTCClient.create(),
});

export function getFakeAgoraRTC() {
  return FakeAgoraRTC;
}

export const FakeAgoraRTCWrapper = {
  getFakeAgoraRTC: getFakeAgoraRTC,
};

export default FakeAgoraRTC;
