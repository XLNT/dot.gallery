import { get } from "lodash-es";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import { useCurrentEntityQuery } from "../../operations";
import AssetsList from "components/AssetsList";
import mutedImage from "static/muted.svg";
import unmutedImage from "static/unmuted.svg";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Handle = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MuteButton = styled.img`
  cursor: pointer;
  margin-left: 0.5rem;

  transform: scale(1);
  &:hover {
    transform: scale(1.1);
  }

  will-change: transform;
`;

const StyledAssetsList = styled(AssetsList)`
  padding-left: 1rem;
  padding-right: 5rem;

  overflow-x: auto;
  overflow-y: hidden;
`;

export default function PresentSelf({
  muted,
  setMuted,
  draggable = false,
  wrappable = false,
  children,
  ...rest
}: PropsWithChildren<{
  muted: boolean;
  setMuted: (muted: boolean) => void;
  draggable?: boolean;
  wrappable?: boolean;
}>) {
  const { data } = useCurrentEntityQuery();

  const handle = get(data, ["currentEntity", "handle"], "Anonymous");
  const assets = get(data, ["currentEntity", "tradableAssets"], []);

  return (
    <Container {...rest}>
      <Handle>
        {handle} (you)
        <MuteButton
          alt={muted ? "muted" : "unmuted"}
          onClick={() => setMuted(!muted)}
          src={muted ? mutedImage : unmutedImage}
        />
      </Handle>
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
