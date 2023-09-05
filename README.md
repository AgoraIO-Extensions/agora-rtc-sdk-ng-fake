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
│  │  ├─ camera-video-track.ts // FakeCameraVideoTrack (模拟ICameraVideoTrack)
│  │  ├─ index.ts  //入口文件
│  │  ├─ local-audio-track.ts // FakeLocalAudioTrack (模拟ILocalAudioTrack)
│  │  ├─ local-track.ts // FakeLocalTrack (模拟ILocalTrack)
│  │  ├─ local-video-track.ts // FakeLocalVideoTrack (模拟ILocalVideoTrack)
│  │  ├─ microphone-audio-track.ts // FakeMicrophoneAudioTrack (模拟IMicrophoneAudioTrack)
│  │  ├─ remote-audio-track.ts // FakeRemoteAudioTrack (模拟IRemoteAudioTrack)
│  │  ├─ remote-track.ts // FakeRemoteTrack (模拟IRemoteTrack)
│  │  ├─ remote-video-track.ts // FakeRemoteVideoTrack (模拟IRemoteVideoTrack)
│  │  └─ track.ts // FakeTrack (模拟ITrack)
│  ├─ client.ts // FakeRTCClient(模拟AgoraRTC)
│  ├─ eventemitter.ts // FakeRTCClient(模拟webSDK事件)
│  ├─ index.ts  //入口文件
│  ├─ utils.ts  //工具
│  ├─ version.ts //package版本
├─ tsup.config.ts //构建配置
└─ vite.config.ts //vitest单元测试配置

```
