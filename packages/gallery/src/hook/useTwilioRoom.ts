import {
  LocalTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  TwilioError,
  connect,
} from "twilio-video";
import { filter, mapValues, uniq } from "lodash-es";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

enum RoomState {
  Disconnected,
  Reconnecting,
  Connected,
}

enum ActionType {
  OnConnect,
  OnDisconnect,
  OnReconnecting,
  OnReconnected,
  OnParticipantConnected,
  OnParticipantDisconnected,
  OnTrackEnabled,
  OnTrackDisabled,
  OnTrackPublished,
  OnTrackUnpublished,
  OnTrackSubscribed,
  OnTrackUnsubscribed,

  SetSelfMuted,
  SetParticipantMuted,
}

type Action =
  | { type: ActionType.OnConnect; payload: { room: Room } }
  | {
      type: ActionType.OnDisconnect;
      payload: { room: Room; error: TwilioError };
    }
  | { type: ActionType.OnReconnecting; payload: { error: TwilioError } }
  | { type: ActionType.OnReconnected }
  | {
      type: ActionType.OnTrackEnabled;
      payload: {
        publication: RemoteTrackPublication;
        participant: RemoteParticipant;
      };
    }
  | {
      type: ActionType.OnTrackDisabled;
      payload: {
        publication: RemoteTrackPublication;
        participant: RemoteParticipant;
      };
    }
  | {
      type: ActionType.OnTrackPublished;
      payload: {
        publication: RemoteTrackPublication;
        participant: RemoteParticipant;
      };
    }
  | {
      type: ActionType.OnTrackUnpublished;
      payload: {
        publication: RemoteTrackPublication;
        participant: RemoteParticipant;
      };
    }
  | {
      type: ActionType.OnTrackSubscribed;
      payload: {
        track: RemoteTrack;
        publication: RemoteTrackPublication;
        participant: RemoteParticipant;
      };
    }
  | {
      type: ActionType.OnTrackUnsubscribed;
      payload: {
        track: RemoteTrack;
        publication: RemoteTrackPublication;
        participant: RemoteParticipant;
      };
    }
  | {
      type: ActionType.OnParticipantConnected;
      payload: { participant: RemoteParticipant };
    }
  | {
      type: ActionType.OnParticipantDisconnected;
      payload: { participant: RemoteParticipant };
    }
  | { type: ActionType.SetSelfMuted; payload: { selfMuted: boolean } }
  | {
      type: ActionType.SetParticipantMuted;
      payload: { id: string; muted: boolean };
    };

interface State {
  room?: Room;
  roomState: RoomState;
  selfMuted: boolean;
  mutedParticipantIds: string[];
  error?: TwilioError;
  subscribedTracks: { [_: string]: RemoteTrack[] };
  participants: RemoteParticipant[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // connectivity

    case ActionType.OnConnect: {
      const { room } = action.payload;
      return {
        ...state,
        room,
        roomState: RoomState.Connected,
        error: undefined,
      };
    }
    case ActionType.OnDisconnect: {
      const { room, error } = action.payload;
      console.log(
        `[local] disconnected from room ${room.sid} with error ${error}`,
      );
      return {
        ...state,
        room: undefined,
        roomState: RoomState.Disconnected,
        error,
        participants: [],
        subscribedTracks: {},
      };
    }
    case ActionType.OnReconnecting: {
      const { error } = action.payload;
      console.log(`[local] reconnecting with error ${error}`);
      return {
        ...state,
        roomState: RoomState.Reconnecting,
        error,
      };
    }
    case ActionType.OnReconnected: {
      return {
        ...state,
        roomState: RoomState.Connected,
        error: undefined,
      };
    }

    // tracks

    case ActionType.OnTrackEnabled: {
      const { participant, publication } = action.payload;
      console.log(
        `participant ${participant.identity} has enabled track ${publication.trackSid}`,
      );
      return state;
    }
    case ActionType.OnTrackDisabled: {
      const { participant, publication } = action.payload;
      console.log(
        `participant ${participant.identity} has DISenabled track ${publication.trackSid}`,
      );
      return state;
    }
    case ActionType.OnTrackPublished: {
      const { participant, publication } = action.payload;
      console.log(
        `participant ${participant.identity} published a(n) ${
          publication.kind
        } track ${publication.trackSid} that we ${
          publication.isSubscribed ? "are" : "are not"
        } subscribed to.`,
      );
      return state;
    }
    case ActionType.OnTrackUnpublished: {
      const { participant, publication } = action.payload;
      console.log(
        `participant ${participant.identity} UNpublished a(n) ${
          publication.kind
        } track ${publication.trackSid} that we ${
          publication.isSubscribed ? "are" : "are not"
        } subscribed to.`,
      );
      return state;
    }
    case ActionType.OnTrackSubscribed: {
      const { track, participant } = action.payload;
      console.log(
        `we have subscribed to participant ${participant.identity}'s ${track.kind} track ${track.sid}`,
      );
      return {
        ...state,
        subscribedTracks: {
          ...state.subscribedTracks,
          [participant.identity]: [
            ...(state.subscribedTracks[participant.identity] || []),
            track,
          ],
        },
      };
    }
    case ActionType.OnTrackUnsubscribed: {
      const { track, participant } = action.payload;
      console.log(
        `we have UNsubscribed to participant ${participant.identity}'s ${track.kind} track ${track.sid}`,
      );

      // // detatch from track
      // if (track.kind === "audio") {
      //   track.detach();
      // }
      // remove from cache
      return {
        ...state,
        subscribedTracks: mapValues(state.subscribedTracks, tracks =>
          tracks.filter(t => t.sid !== track.sid),
        ),
      };
    }

    // participants

    case ActionType.OnParticipantConnected: {
      const { participant } = action.payload;
      console.log(`participant ${participant.identity} joined!`);

      return {
        ...state,
        participants: [...state.participants, participant],
      };
    }
    case ActionType.OnParticipantDisconnected: {
      const { participant } = action.payload;
      console.log(`participant ${participant.identity} left!`);

      return {
        ...state,
        participants: state.participants.filter(
          p => p.identity !== participant.identity,
        ),
      };
    }

    // muting

    case ActionType.SetSelfMuted: {
      const { selfMuted } = action.payload;
      return {
        ...state,
        selfMuted,
      };
    }
    case ActionType.SetParticipantMuted: {
      const { id, muted } = action.payload;
      return {
        ...state,
        mutedParticipantIds: muted
          ? uniq([...state.mutedParticipantIds, id])
          : filter(state.mutedParticipantIds, i => i !== id),
      };
    }

    default:
      throw new Error(`Unknown action ${action}.`);
  }
};

const HANDLER_ACTION_CREATORS: { [_: string]: (...args: any[]) => Action } = {
  disconnect: (room: Room, error: TwilioError) => ({
    type: ActionType.OnDisconnect,
    payload: { room, error },
  }),
  reconnecting: (error: TwilioError) => ({
    type: ActionType.OnReconnecting,
    payload: { error },
  }),
  reconnected: () => ({ type: ActionType.OnReconnected }),
  trackEnabled: (
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) => ({
    type: ActionType.OnTrackEnabled,
    payload: { publication, participant },
  }),
  trackDisabled: (
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) => ({
    type: ActionType.OnTrackDisabled,
    payload: { publication, participant },
  }),
  trackPublished: (
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) => ({
    type: ActionType.OnTrackPublished,
    payload: { publication, participant },
  }),
  trackUnpublished: (
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) => ({
    type: ActionType.OnTrackUnpublished,
    payload: { publication, participant },
  }),
  trackSubscribed: (
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) => ({
    type: ActionType.OnTrackSubscribed,
    payload: { track, publication, participant },
  }),
  trackUnsubscribed: (
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) => ({
    type: ActionType.OnTrackUnsubscribed,
    payload: { track, publication, participant },
  }),
  participantConnected: (participant: RemoteParticipant) => ({
    type: ActionType.OnParticipantConnected,
    payload: { participant },
  }),
  participantDisconnected: (participant: RemoteParticipant) => ({
    type: ActionType.OnParticipantDisconnected,
    payload: { participant },
  }),
};

export default function useTwilioRoom(
  token: string,
  id: string,
  tracks: LocalTrack[],
) {
  const elementCache = useRef<{ [_: string]: HTMLAudioElement }>({});
  const [state, dispatch] = useReducer(reducer, {
    roomState: RoomState.Disconnected,
    subscribedTracks: {},
    participants: [],
    selfMuted: false,
    mutedParticipantIds: [],
  });

  const {
    room,
    participants,
    subscribedTracks,
    selfMuted,
    mutedParticipantIds,
  } = state;

  const canConnect = tracks !== null && !!id && !!token;

  // idempotent (afaict)
  const loadTrack = useCallback((track: RemoteTrack) => {
    if (elementCache.current[track.sid]) return;

    console.log(`ATtaching track ${track.sid}`);
    if (track.kind === "audio") {
      elementCache.current[track.sid] = track.attach();
    }
  }, []);

  // idempotent (afaict)
  const unloadTrack = useCallback((track: RemoteTrack) => {
    if (!elementCache.current[track.sid]) return;

    console.log(`DEtaching track ${track.sid}`);
    if (track.kind === "audio") {
      elementCache.current[track.sid].muted = true; // chromium hack
      track.detach(elementCache.current[track.sid]);
      elementCache.current[track.sid].srcObject = null; // chromium hack
      delete elementCache.current[track.sid];
    }
  }, []);

  // handle room changes
  useEffect(() => {
    if (!room) return;

    const handlers = mapValues(
      HANDLER_ACTION_CREATORS,
      creator => (...args: any[]) => dispatch(creator(...args)),
    );

    console.log(`connected to room ${room.sid}`);

    room.participants.forEach(participant =>
      dispatch({
        type: ActionType.OnParticipantConnected,
        payload: { participant },
      }),
    );
    Object.keys(handlers).forEach(event => room.on(event, handlers[event]));

    return () => {
      console.log(`disconnecting from room ${room.sid}`);
      Object.keys(handlers).forEach(event => room.off(event, handlers[event]));
      room.disconnect();
    };
  }, [room]);

  // connect to the room when available
  useEffect(() => {
    let mounted = true;
    if (canConnect) {
      (async () => {
        const room = await connect(
          token,
          { name: id, audio: false, video: false },
          // ^ join with nothing because we're going to mute/unmute ourselves later
        );
        if (!mounted) return;
        dispatch({ type: ActionType.OnConnect, payload: { room } });
      })();
    }
    return () => (mounted = false);
  }, [canConnect, id, token]);

  // auto-connect existing participant tracks
  // useEffect(() => {
  //   participants.forEach(participant => {
  //     participant.tracks.forEach(publication =>
  //       dispatch({
  //         type: ActionType.OnTrackPublished,
  //         payload: { publication, participant },
  //       }),
  //     );
  //   });
  // }, [participants]);

  // handle mute status
  useEffect(() => {
    if (room) {
      if (selfMuted) {
        console.log(`[local] UNpublishing self track`);
        room.localParticipant.unpublishTracks(tracks);
      } else {
        console.log(`[local] publishing self track`);
        room.localParticipant.publishTracks(tracks);
      }
    }
  }, [selfMuted, room, tracks]);

  // handle remote muting
  // TODO: use twilio-video v2 trackSubscriptions to mute instead of local detaching
  useEffect(() => {
    // every time participants or subscribedTracks changes,
    // go through every participant and their tracks
    participants.forEach(p => {
      // if the participant is muted or I self-muted, unload all of their tracks
      if (selfMuted || mutedParticipantIds.includes(p.identity)) {
        (subscribedTracks[p.identity] || []).forEach(unloadTrack);
      } else {
        // otherwise make sure their track is loaded
        (subscribedTracks[p.identity] || []).forEach(loadTrack);
      }
    });
  }, [
    loadTrack,
    mutedParticipantIds,
    participants,
    selfMuted,
    subscribedTracks,
    unloadTrack,
  ]);

  // disconnect from room on unload
  const handleBeforeUnload = useCallback(() => room.disconnect(), [room]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [handleBeforeUnload]);

  const setSelfMuted = useCallback(
    (selfMuted: boolean) =>
      dispatch({ type: ActionType.SetSelfMuted, payload: { selfMuted } }),
    [],
  );

  const setMutedParticipant = useCallback(
    (id: string) => (muted: boolean) =>
      dispatch({
        type: ActionType.SetParticipantMuted,
        payload: { id, muted },
      }),
    [],
  );

  const mutedParticipant = useMemo(
    () =>
      participants.reduce((memo, participant) => {
        const isManuallyMuted = mutedParticipantIds.includes(
          participant.identity,
        );
        const isSelfMuted =
          !subscribedTracks[participant.identity] ||
          subscribedTracks[participant.identity].length === 0;
        memo[participant.identity] = isManuallyMuted || isSelfMuted;
        return memo;
      }, {}),
    [mutedParticipantIds, participants, subscribedTracks],
  );

  // if self muted, show no participants
  const visibleParticipants = selfMuted ? [] : participants;

  return {
    participants: visibleParticipants,
    selfMuted,
    setSelfMuted,
    mutedParticipant,
    setMutedParticipant,
  };
}
