import {
  LocalTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  TwilioError,
  connect,
} from "twilio-video";
import { differenceBy, mapValues, uniq, uniqBy } from "lodash-es";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import update, { extend } from "immutability-helper";

import usePreviousValue from "./usePreviousValue";

extend("$autoArray", function(value, object) {
  return object ? update(object, value) : update([], value);
});

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
      payload: { room?: Room; error?: TwilioError };
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
      console.log(`connected to room ${room.sid}`);

      return update(state, {
        room: { $set: room },
        roomState: { $set: RoomState.Connected },
        error: { $set: undefined },
      });
    }
    case ActionType.OnDisconnect: {
      const { room, error } = action.payload;
      console.log(
        `[local] disconnected from room ${room.sid} with error ${error}`,
      );

      return update(state, {
        room: { $set: undefined },
        roomState: { $set: RoomState.Disconnected },
        error: { $set: error },
        participants: { $set: [] },
        subscribedTracks: { $set: {} },
      });
    }
    case ActionType.OnReconnecting: {
      const { error } = action.payload;
      console.log(`[local] reconnecting with error ${error}`);

      return update(state, {
        roomState: { $set: RoomState.Reconnecting },
        error: { $set: error },
      });
    }
    case ActionType.OnReconnected: {
      console.log(`REconnected to room ${state.room.sid}`);

      return update(state, {
        roomState: { $set: RoomState.Connected },
        error: { $set: undefined },
      });
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

      return update(state, {
        subscribedTracks: {
          [participant.identity]: tracks =>
            update(tracks || [], tracks =>
              uniqBy([...tracks, track], t => t.sid),
            ),
        },
      });
    }
    case ActionType.OnTrackUnsubscribed: {
      const { track, participant } = action.payload;
      console.log(
        `we have UNsubscribed to participant ${participant.identity}'s ${track.kind} track ${track.sid}`,
      );

      return update(state, {
        subscribedTracks: {
          [participant.identity]: tracks =>
            update(tracks || [], tracks =>
              tracks.filter(t => t.sid !== track.sid),
            ),
        },
      });
    }

    // participants

    case ActionType.OnParticipantConnected: {
      const { participant } = action.payload;
      console.log(`participant ${participant.identity} joined!`);

      return update(state, {
        participants: participants =>
          update(participants || [], participants =>
            uniqBy([...participants, participant], i => i.identity),
          ),
      });
    }
    case ActionType.OnParticipantDisconnected: {
      const { participant } = action.payload;
      console.log(`participant ${participant.identity} left!`);

      return update(state, {
        participants: participants =>
          update(participants || [], participants =>
            participants.filter(p => p.identity !== participant.identity),
          ),
      });
    }

    // muting

    case ActionType.SetSelfMuted: {
      const { selfMuted } = action.payload;

      return update(state, {
        selfMuted: { $set: selfMuted },
      });
    }
    case ActionType.SetParticipantMuted: {
      const { id, muted } = action.payload;

      return update(state, {
        mutedParticipantIds: ids =>
          update(ids || [], ids =>
            muted ? uniq([...ids, id]) : ids.filter(i => i !== id),
          ),
      });
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
  const [_room, _setRoom] = useState<Room>();
  const elementCache = useRef<{ [_: string]: HTMLAudioElement }>({});
  const [state, dispatch] = useReducer(reducer, {
    roomState: RoomState.Disconnected,
    subscribedTracks: {},
    participants: [],
    selfMuted: false,
    mutedParticipantIds: [],
  });

  const prevParticipants = usePreviousValue(state.participants);

  const {
    participants,
    subscribedTracks,
    selfMuted,
    mutedParticipantIds,
  } = state;

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

  // ensure local state knows about sync-known track publications
  useEffect(() => {
    const newParticipants = differenceBy(
      participants,
      prevParticipants,
      p => p.identity,
    );
    newParticipants.forEach(participant => {
      participant.tracks.forEach(publication => {
        console.log(
          `[local] publishing known track ${publication.trackSid} for existing participant ${participant.identity}`,
        );
        dispatch({
          type: ActionType.OnTrackPublished,
          payload: { publication, participant },
        });
      });
    });
  }, [participants, prevParticipants]);

  const handlers = useMemo(
    () =>
      mapValues(HANDLER_ACTION_CREATORS, creator => (...args: any[]) =>
        dispatch(creator(...args)),
      ),
    [],
  );

  // when there is a new room...
  useEffect(() => {
    if (!_room) return;

    // notify connected
    dispatch({
      type: ActionType.OnConnect,
      payload: { room: _room },
    });

    // add event handlers
    _room.setMaxListeners(Object.keys(handlers).length);
    Object.keys(handlers).forEach(event => _room.on(event, handlers[event]));

    // forward participant connected events
    _room.participants.forEach(participant =>
      dispatch({
        type: ActionType.OnParticipantConnected,
        payload: { participant },
      }),
    );
  }, [_room, handlers]);

  // handle mute status
  useEffect(() => {
    if (!_room) return;

    if (selfMuted) {
      console.log(`[local] UNpublishing self track`);
      _room.localParticipant.unpublishTracks(tracks);
    } else {
      console.log(`[local] publishing self track`);
      _room.localParticipant.publishTracks(tracks);
    }

    return () => {
      _room.localParticipant.unpublishTracks(tracks);
    };
  }, [_room, selfMuted, tracks]);

  // sync track loading to muting behavior
  // TODO: use twilio-video v2 trackSubscriptions to mute instead of local detaching
  useEffect(() => {
    console.log(
      `[load/unload] looping through participants ${participants.map(
        p => p.identity,
      )}`,
    );

    // every time participants or subscribedTracks changes,
    // go through every participant and their tracks
    participants.forEach(p => {
      // if the participant is muted or I self-muted, unload all of their tracks
      if (selfMuted || mutedParticipantIds.includes(p.identity)) {
        console.log(`[unload] UNloading tracks for participant ${p.identity}`);
        (subscribedTracks[p.identity] || []).forEach(unloadTrack);
      } else {
        // otherwise make sure their track is loaded
        console.log(`[load] loading tracks for participant ${p.identity}`);
        (subscribedTracks[p.identity] || []).forEach(loadTrack);
      }
    });

    return () => {
      participants.forEach(p =>
        (subscribedTracks[p.identity] || []).forEach(unloadTrack),
      );
    };
  }, [
    loadTrack,
    unloadTrack,
    mutedParticipantIds,
    participants,
    selfMuted,
    subscribedTracks,
  ]);

  // disconnect from room on unload
  useEffect(() => {
    if (!_room) return;

    const handler = () => _room.disconnect();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [_room]);

  // on dispose
  useEffect(() => {
    if (!_room) return;

    return () => {
      // remove all handlers
      Object.keys(handlers).forEach(event => _room.off(event, handlers[event]));

      // notify disconnected
      dispatch({
        type: ActionType.OnDisconnect,
        payload: { room: _room },
      });

      // disconnect from twilio signalling
      console.log(`[twilio] DISconnecting from room ${_room.sid}`);
      _room.disconnect();
    };
  }, [_room, handlers]);

  // connect to the room when available
  // (this should only really change when `id` changes or `tracks` become available)
  useEffect(() => {
    let mounted = true;

    // if the ability to connect to twilio has changed, nuke the current room
    if (!id || !token) {
      return _setRoom(undefined);
    }

    // if we can connect to twilio, let's do that in the background and then set the room
    (async () => {
      console.log(`[twilio] connecting to room ${id}`);
      const room = await connect(
        token,
        { name: id, audio: false, video: false },
        // ^ join with nothing because we're going to mute/unmute ourselves later
      );

      if (!mounted) {
        // we've unmounted in the meantime, so disconnect
        // and move along (move along like i know you do)
        room.disconnect();
        return;
      }
      _setRoom(room);
    })();

    return () => (mounted = false);
  }, [id, token]);

  // derived state for UI

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
