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

  const [focusedParticipant, setFocusedParticipant] = useState<string>();

  const { data: tokenData } = useTwilioAccessTokenQuery();

  const {
    participants,
    selfMuted,
    setSelfMuted,
    mutedParticipant,
    setMutedParticipant,
  } = useTwilioRoom(
    get(tokenData, "twilioAccessToken"),
    get(room, "id"),
    tracks,
  );

  const transitions = useTransition(participants, p => p.identity, {
    initial: { transform: "translate3d(0, 2rem, -100px)", opacity: 0 },
    from: { transform: "translate3d(0, 2rem, -100px)", opacity: 0 },
    enter: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    leave: { transform: "translate3d(0, 2rem, -100px)", opacity: 0 },
  });

  return (
    <>
      <PresenceList>
        {transitions.map(({ item: participant, key, props }) => (
          <animated.div key={key} style={props}>
            <PresentEntity
              id={participant.identity}
              focused={focusedParticipant === participant.identity}
              onFocus={setFocusedParticipant}
              muted={mutedParticipant[participant.identity]}
              setMuted={setMutedParticipant(participant.identity)}
            />
          </animated.div>
        ))}
        <PresentSelf draggable muted={selfMuted} setMuted={setSelfMuted}>
          {loadingAsset && <LoadingAsset />}
        </PresentSelf>
      </PresenceList>
    </>
  );
}
