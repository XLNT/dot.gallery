import { PeerList, RemoteAudioPlayer } from "@andyet/simplewebrtc";
import { useCurrentEntityQuery } from "../../operations";
import PresentEntity from "./PresentEntity";
import React from "react";
import styled from "styled-components";

const PresenceList = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: calc(100% - 7rem);
`;

export default function SocialLayer() {
  const { data, loading, error } = useCurrentEntityQuery({
    pollInterval: 5000,
  });

  return (
    <>
      <RemoteAudioPlayer />
      <PeerList
        room="test"
        render={({ peers }) =>
          peers.map(peer => {
            console.log(peer);
            return (
              <PresenceList key={peer.id}>
                {!loading && !error && data.currentEntity && (
                  <PresentEntity entity={data.currentEntity} />
                )}
              </PresenceList>
            );
          })
        }
      />
    </>
  );
}
