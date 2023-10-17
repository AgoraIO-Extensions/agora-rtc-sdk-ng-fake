# agora-rtc-sdk-ng-fake

Fake RTC client, remote users and tracks. For internal stubbing.

#### Setup

npm install -g pnpm

#### Get Started

pnpm install

#### How to publish

use [publish actions](https://github.com/AgoraIO-Extensions/agora-rtc-sdk-ng-fake/actions/workflows/publish.yml)

```
agora-rtc-sdk-ng-fake
├─ src
│  ├─ tracks
│  │  ├─ camera-video-track.ts // FakeCameraVideoTrack (mock ICameraVideoTrack)
│  │  ├─ index.ts  //entry
│  │  ├─ local-audio-track.ts // FakeLocalAudioTrack (mock ILocalAudioTrack)
│  │  ├─ local-track.ts // FakeLocalTrack (mock ILocalTrack)
│  │  ├─ local-video-track.ts // FakeLocalVideoTrack (mock ILocalVideoTrack)
│  │  ├─ microphone-audio-track.ts // FakeMicrophoneAudioTrack (mock IMicrophoneAudioTrack)
│  │  ├─ remote-audio-track.ts // FakeRemoteAudioTrack (mock IRemoteAudioTrack)
│  │  ├─ remote-track.ts // FakeRemoteTrack (mock IRemoteTrack)
│  │  ├─ remote-video-track.ts // FakeRemoteVideoTrack (mock IRemoteVideoTrack)
│  │  └─ track.ts // FakeTrack (mock ITrack)
│  ├─ client.ts // FakeRTCClient(mock AgoraRTC)
│  ├─ eventemitter.ts // FakeRTCClient(mock webSDK event handler)
│  ├─ index.ts  //entry
│  ├─ utils.ts  // utils
│  ├─ version.ts //package version
├─ webpack.config.ts //build config
└─ vite.config.ts //vitest unit test config

```
