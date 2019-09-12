import {
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  TwilioError,
  connect,
} from "twilio-video";
import { get } from "lodash-es";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useTwilioAccessTokenQuery } from "operations";
import AudioTrack from "context/AudioTrack";

enum RoomState {
  Disconnected,
  Reconnecting,
  Connected,
}

export default function useTwilioRoom(
  id: string,
  muteSelf = false,
  mutedIds: string[] = [],
) {
  const audioRef = useRef<HTMLAudioElement>(document.createElement("audio"));
  const [room, setRoom] = useState<Room>();

  const [roomState, setRoomState] = useState<RoomState>();
  const [error, setError] = useState<TwilioError>();
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
  const [
    tracksByParticipantIdentity,
    setTracksByParticipantIdentity,
  ] = useState<{ [_: string]: RemoteTrack[] }>({});

  const [
    ,
    { tracks, loading: localTrackLoading, error: localTrackError },
  ] = AudioTrack.useContainer();
  const { data: tokenData } = useTwilioAccessTokenQuery();
  const token = get(tokenData, "twilioAccessToken");

  const canConnect = !!token && !!id && !localTrackLoading && !localTrackError;

  const onConnect = useCallback(() => {
    setRoomState(RoomState.Connected);
    setError(undefined);
  }, []);
  // hook up room event handlers
  const onDisconnect = useCallback((room: Room, error: TwilioError) => {
    console.log(
      `[local] disconnected from room ${room.sid} with error ${error}`,
    );
    setRoomState(RoomState.Disconnected);
    setError(error);
  }, []);
  const onReconnecting = useCallback((error: TwilioError) => {
    console.log(`[local] reconnecting with error ${error}`);
    setRoomState(RoomState.Reconnecting);
    setError(error);
  }, []);
  const onReconnected = onConnect;

  const onTrackEnabled = useCallback(
    (publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      console.log(
        `participant ${participant.identity} has enabled track ${publication.trackSid}`,
      );
    },
    [],
  );
  const onTrackDisabled = useCallback(
    (publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      console.log(
        `participant ${participant.identity} has DISenabled track ${publication.trackSid}`,
      );
    },
    [],
  );
  const onTrackPublished = useCallback(
    (publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      console.log(
        `participant ${participant.identity} published a(n) ${
          publication.kind
        } track ${publication.trackSid} that we ${
          publication.isSubscribed ? "are" : "are not"
        } subscribed to.`,
      );
    },
    [],
  );
  const onTrackUnpublished = useCallback(
    (publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      console.log(
        `participant ${participant.identity} UNpublished a(n) ${
          publication.kind
        } track ${publication.trackSid} that we ${
          publication.isSubscribed ? "are" : "are not"
        } subscribed to.`,
      );
    },
    [],
  );
  const onTrackSubscribed = useCallback(
    (
      track: RemoteTrack,
      publication: RemoteTrackPublication,
      participant: RemoteParticipant,
    ) => {
      console.log(
        `we have subscribed to participant ${participant.identity}'s ${track.kind} track ${track.sid}`,
      );

      setTracksByParticipantIdentity(store => ({
        ...store,
        [participant.identity]: [...(store[participant.identity] || []), track],
      }));
    },
    [],
  );
  const onTrackUnsubscribed = useCallback(
    (
      track: RemoteTrack,
      publication: RemoteTrackPublication,
      participant: RemoteParticipant,
    ) => {
      console.log(
        `we have UNsubscribed to participant ${participant.identity}'s ${track.kind} track ${track.sid}`,
      );

      // detatch from track
      if (track.kind === "audio") {
        track.detach();
      }
      // remove from cache
      setTracksByParticipantIdentity(store => ({
        ...store,
        [participant.identity]: [
          ...(store[participant.identity] || []).filter(
            t => t.sid !== track.sid,
          ),
        ],
      }));
    },
    [],
  );

  const onParticipantConnected = useCallback(
    (participant: RemoteParticipant) => {
      console.log(`participant ${participant.identity} joined!`);
      setParticipants(participants => [...participants, participant]);
      participant.tracks.forEach(publication =>
        onTrackPublished(publication, participant),
      );
    },
    [onTrackPublished],
  );
  const onParticipantDisconnected = useCallback(
    (participant: RemoteParticipant) => {
      console.log(`participant ${participant.identity} left!`);
      setParticipants(participants => [
        ...participants.filter(p => p.identity !== participant.identity),
      ]);
    },
    [],
  );
  const handlers = useMemo(
    () => ({
      disconnect: onDisconnect,
      reconnecting: onReconnecting,
      reconnected: onReconnected,
      participantConnected: onParticipantConnected,
      participantDisconnected: onParticipantDisconnected,
      trackEnabled: onTrackEnabled,
      trackDisabled: onTrackDisabled,
      trackPublished: onTrackPublished,
      trackUnpublished: onTrackUnpublished,
      trackSubscribed: onTrackSubscribed,
      trackUnsubscribed: onTrackUnsubscribed,
    }),
    [
      onDisconnect,
      onParticipantConnected,
      onParticipantDisconnected,
      onReconnected,
      onReconnecting,
      onTrackDisabled,
      onTrackEnabled,
      onTrackPublished,
      onTrackSubscribed,
      onTrackUnpublished,
      onTrackUnsubscribed,
    ],
  );

  const loadTrack = useCallback((track: RemoteTrack) => {
    console.log(`ATtaching track ${track.sid}`);
    if (track.kind === "audio") track.attach(audioRef.current);
  }, []);
  const unloadTrack = useCallback((track: RemoteTrack) => {
    console.log(`DEtaching track ${track.sid}`);
    if (track.kind === "audio") track.detach(audioRef.current);
  }, []);

  const loadRoom = useCallback(
    (room: Room) => {
      if (room) {
        console.log(`connected to room ${room.sid}`);
        onConnect();
        room.participants.forEach(p => onParticipantConnected(p));
        Object.keys(handlers).forEach(event => room.on(event, handlers[event]));
      }
    },
    [handlers, onConnect, onParticipantConnected],
  );

  const unloadRoom = useCallback(
    (room: Room) => {
      if (room) {
        console.log(`disconnecting from room ${room.sid}`);
        Object.keys(handlers).forEach(event =>
          room.off(event, handlers[event]),
        );
        room.disconnect();
        setParticipants(() => []);
        Object.values(tracksByParticipantIdentity).forEach(tracks =>
          tracks.forEach(unloadTrack),
        );
      }
    },
    [handlers, tracksByParticipantIdentity, unloadTrack],
  );

  // and disconnect when not available
  useEffect(() => {
    loadRoom(room);
    return () => unloadRoom(room);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  // connect to the room when available
  useEffect(() => {
    let mounted = true;
    if (canConnect) {
      (async () => {
        const room = await connect(
          token,
          { name: id, audio: false, video: false },
          // ^ join with nothing because we're going to mute ourselves later
        );
        if (!mounted) return;
        setRoom(room);
      })();
    }
    return () => (mounted = false);
  }, [canConnect, id, token, tracks]);

  // handle mute status
  useEffect(() => {
    if (room) {
      if (muteSelf) {
        console.log(`[local] UNpublishing self track`);
        room.localParticipant.unpublishTracks(tracks);
      } else {
        console.log(`[local] publishing self track`);
        room.localParticipant.publishTracks(tracks);
      }
    }
  }, [muteSelf, room, tracks]);

  // handle remote muting
  useEffect(() => {
    // TODO: use twilio-video v2 trackSubscriptions to mute instead of local detaching
    participants.forEach(p => {
      if (mutedIds.includes(p.identity)) {
        (tracksByParticipantIdentity[p.identity] || []).forEach(unloadTrack);
      } else {
        (tracksByParticipantIdentity[p.identity] || []).forEach(loadTrack);
      }
    });
  }, [
    loadTrack,
    mutedIds,
    participants,
    room,
    tracks,
    tracksByParticipantIdentity,
    unloadTrack,
  ]);

  // // disconnect from room on unload
  // const handleBeforeUnload = useCallback(() => unloadRoom(room), [
  //   room,
  //   unloadRoom,
  // ]);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, [handleBeforeUnload]);

  return { participants, tracksByParticipantIdentity, state: roomState, error };
}
