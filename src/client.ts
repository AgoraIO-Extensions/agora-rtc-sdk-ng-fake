import { randNumber, randUuid } from "@ngneat/falso";
import type {
  ClientRole,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IRemoteAudioTrack,
  IRemoteTrack,
  IRemoteVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";
import { SideEffectManager } from "side-effect-manager";

import { FakeAgoraEventEmitter } from "./eventemitter";
import { FakeRemoteAudioTrack, FakeRemoteVideoTrack } from "./tracks";
import { hideProperties } from "./utils";

export const FAKE_CHANNEL_NAME = "AGORA-RTC-SDK-NG-FAKE-CHANNEL";

export class FakeRTCClient extends FakeAgoraEventEmitter {
  remoteUsers: IAgoraRTCRemoteUser[] = [];
  uid?: UID;
  channelName?: string;
  role?: ClientRole;

  public static create(
    executor?: Partial<IAgoraRTCClient> | ((client: FakeRTCClient) => Partial<IAgoraRTCClient>),
  ): IAgoraRTCClient {
    const client = new FakeRTCClient();
    const partialClient = typeof executor === "function" ? executor(client) : executor;
    return Object.assign(client, partialClient) as unknown as IAgoraRTCClient;
  }

  private _sideEffect = new SideEffectManager();

  public constructor() {
    super();
    hideProperties(this, "_disposable");
  }

  /**
   * Subscribes to the audio and/or video tracks of a remote user.
   *
   * ```javascript
   * await client.subscribe(user，"audio");
   * user.audioTrack.play();
   * ```
   * @param user The remote user.
   * @param mediaType The media type of the tracks to subscribe to.
   * - `"video"`: Subscribe to the video track only.
   * - `"audio"`: Subscribe to the audio track only.
   *
   * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
   * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
   * @category Agora Core
   */
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "video"): Promise<IRemoteVideoTrack>;
  /**
   * Subscribes to the audio and/or video tracks of a remote user.
   *
   * ```javascript
   * await client.subscribe(user，"audio");
   * user.audioTrack.play();
   * ```
   * @param user The remote user.
   * @param mediaType The media type of the tracks to subscribe to.
   * - `"video"`: Subscribe to the video track only.
   * - `"audio"`: Subscribe to the audio track only.
   *
   * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
   * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
   * @category Agora Core
   */
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "audio"): Promise<IRemoteAudioTrack>;
  /**
   * Subscribes to the audio and/or video tracks of a remote user.
   *
   * ```javascript
   * await client.subscribe(user，"audio");
   * user.audioTrack.play();
   * ```
   * @param user The remote user.
   * @param mediaType The media type of the tracks to subscribe to.
   * - `"video"`: Subscribe to the video track only.
   * - `"audio"`: Subscribe to the audio track only.
   *
   * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
   * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
   * @category Agora Core
   */
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio"): Promise<IRemoteTrack>;
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio"): Promise<IRemoteTrack> {
    if (mediaType === "audio") {
      if (!user.audioTrack) {
        const audioTrack = FakeRemoteAudioTrack.create();
        user.audioTrack = audioTrack;
        this._sideEffect.setInterval(
          () => {
            audioTrack.setVolume(randNumber({ min: 0, max: 100 }));
          },
          2000,
          String(user.uid),
        );
      }
      return Promise.resolve(user.audioTrack);
    } else {
      if (!user.videoTrack) {
        const videoTrack = FakeRemoteVideoTrack.create();
        user.videoTrack = videoTrack;
      }
      return Promise.resolve(user.videoTrack);
    }
  }

  async unsubscribe(user: IAgoraRTCRemoteUser, mediaType?: "video" | "audio" | undefined) {
    if (!mediaType || mediaType === "audio") {
      if (user.audioTrack) {
        user.audioTrack.stop();
        user.audioTrack = undefined;
        this._sideEffect.flush(String(user.uid));
      }
    }

    if (!mediaType || mediaType === "video") {
      if (user.videoTrack) {
        user.videoTrack.stop();
        user.videoTrack = undefined;
      }
    }
  }

  public massUnsubscribe(users: IAgoraRTCRemoteUser[], mediaType?: "video" | "audio" | undefined) {
    users.forEach(user => {
      this.unsubscribe(user, mediaType);
    });
  }

  public join(
    _appid: string,
    _channel: string,
    _token: string | null,
    uid?: UID | null,
  ): Promise<UID> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore websdk的私有属性
    this.isStringUID = typeof uid === "string";
    this.uid = randUuid();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore websdk的私有属性
    this._joinInfo = { uid: this.uid };
    this.channelName = FAKE_CHANNEL_NAME;
    return Promise.resolve(this.uid);
  }

  public async publish(): Promise<void> {
    return Promise.resolve();
  }

  public async unpublish(): Promise<void> {
    return Promise.resolve();
  }

  public leave(): Promise<void> {
    this.uid = undefined;
    this.channelName = undefined;
    return Promise.resolve();
  }

  public setClientRole(): Promise<void> {
    this.role = "host";
    return Promise.resolve();
  }

  public renewToken(): Promise<void> {
    return Promise.resolve();
  }

  public getLocalAudioStats(): void {
    //
  }

  public getRemoteAudioStats(): void {
    //
  }

  public sendStreamMessage(): void {
    //
  }

  public enableAudioVolumeIndicator(): void {
    //
  }

  public setRemoteVideoStreamType(): void {
    //
  }

  public sendCustomReportMessage(): void {
    //
  }
}
