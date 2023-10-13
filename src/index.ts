import { FakeRTCClient } from "./client";
import { createFakeAgoraRTC } from "./top";
import { FakeCameraVideoTrack, FakeMicrophoneAudioTrack } from "./tracks";

export * from "./tracks";
export * from "./eventemitter";
export * from "./client";
export * from "./version";

export const FakeAgoraRTC = createFakeAgoraRTC({
  setAppType(): void {
    //
  },
  createMicrophoneAudioTrack: async () => FakeMicrophoneAudioTrack.create(),
  createCameraVideoTrack: async () => FakeCameraVideoTrack.create(),
  createClient: () => FakeRTCClient.create(),
});

export default FakeAgoraRTC;
