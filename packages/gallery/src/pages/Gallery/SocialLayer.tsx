import { animated, useTransition } from "react-spring";
import { get, uniq } from "lodash-es";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { Room, useTwilioAccessTokenQuery } from "../../operations";
import { ZIndex } from "lib/zIndex";
import AudioTrack from "context/AudioTrack";
import LoadingAsset from "components/LoadingAsset";
import PresentEntity from "./PresentEntity";
import PresentSelf from "./PresentSelf";
import useTwilioRoom from "hook/useTwilioRoom";

const PresenceList = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width: calc(100% - 7rem);

  z-index: ${ZIndex.Social};
  perspective: 1000px;
  perspective-origin: 10% center;
`;

export default function SocialLayer({
  room,
  loadingAsset = false,
}: {
  room: Pick<Room, "id">;
  loadingAsset: boolean;
}) {
  const [, { tracks }] = AudioTrack.useContainer();

  const [mutedParticipantIds, setMutedParticipantIds] = useState<string[]>([]);
  const [focusedParticipant, setFocusedParticipant] = useState<string>();
  const [muted, setMuted] = useState<boolean>(false);

  const { data: tokenData } = useTwilioAccessTokenQuery();

  const { participants, subscribedTracks } = useTwilioRoom(
    get(tokenData, "twilioAccessToken"),
    get(room, "id"),
    tracks,
    muted,
    mutedParticipantIds,
  );

  const selfMutedIds = participants
    .map(p => p.identity)
    .filter(id => !subscribedTracks[id] || subscribedTracks[id].length === 0);

  console.log(selfMutedIds, subscribedTracks);

  const transitions = useTransition(participants, p => p.identity, {
    initial: { transform: "translate3d(0, 2rem, -100px)", opacity: 0 },
    from: { transform: "translate3d(0, 2rem, -100px)", opacity: 0 },
    enter: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    leave: { transform: "translate3d(0, 2rem, -100px)", opacity: 0 },
  });

  const addMutedId = useCallback(
    (id: string) => setMutedParticipantIds(ids => uniq([...ids, id])),
    [],
  );

  const removeMutedId = useCallback(
    (id: string) => setMutedParticipantIds(ids => ids.filter(i => i !== id)),
    [],
  );

  return (
    <>
      <PresenceList>
        {transitions.map(({ item: participant, key, props }) => (
          <animated.div key={key} style={props}>
            <PresentEntity
              id={participant.identity}
              focused={focusedParticipant === participant.identity}
              onFocus={setFocusedParticipant}
              muted={
                mutedParticipantIds.includes(participant.identity) ||
                selfMutedIds.includes(participant.identity)
              }
              canUnmute={!selfMutedIds.includes(participant.identity)}
              setMuted={(muted: boolean) =>
                muted
                  ? addMutedId(participant.identity)
                  : removeMutedId(participant.identity)
              }
            />
          </animated.div>
        ))}
        <PresentSelf draggable muted={muted} setMuted={setMuted}>
          {loadingAsset && <LoadingAsset />}
        </PresentSelf>
      </PresenceList>
    </>
  );
}
