import { get } from "lodash";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import { Peer, PeerControls } from "@andyet/simplewebrtc";
import { useKnownEntityQuery } from "../../operations";
import AssetsList from "components/AssetsList";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Handle = styled.div``;

const StyledAssetsList = styled(AssetsList)`
  padding-left: 1rem;
  padding-right: 5rem;
`;

export default function PresentEntity({
  peer,
  draggable = true,
  wrappable = false,
  children,
  ...rest
}: PropsWithChildren<{
  draggable?: boolean;
  wrappable?: boolean;
  peer: Peer;
}>) {
  console.log(`Peer ${JSON.stringify(peer.customerData)}`);
  const id: string = get(peer, ["customerData", "id"]);
  const { data, loading, error } = useKnownEntityQuery({
    variables: { id },
    skip: !id,
  });
  const handle: string = get(peer, ["customerData", "handle"], "Anonymous");

  const assets = get(data, ["knownEntity", "assets"], []);

  return (
    <Container {...rest}>
      <Handle>{handle}</Handle>
      <PeerControls
        peer={peer}
        render={({ isMuted, mute, unmute }) => (
          <button onClick={() => (isMuted ? unmute() : mute())}>
            {isMuted ? "unmute" : "mute"}
          </button>
        )}
      />
      <StyledAssetsList
        assets={assets}
        wrappable={wrappable}
        draggable={draggable}
      >
        {children}
      </StyledAssetsList>
    </Container>
  );
}
