import { animated, useSpring } from "react-spring";
import { get } from "lodash-es";
import React, { PropsWithChildren, useCallback } from "react";
import styled from "styled-components";

import { useKnownEntityQuery } from "../../operations";
import AssetsList from "components/AssetsList";
import mutedImage from "static/muted.svg";
import unmutedImage from "static/unmuted.svg";

const ASSETS_EXTENT = 80;

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

  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AssetsContainer = styled(animated.div)`
  transform-origin: left center;
  overflow-x: auto;
  overflow-y: hidden;
`;

const StyledAssetsList = styled(AssetsList)`
  padding-left: 1rem;
  padding-right: 5rem;
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

export default function PresentEntity({
  id,
  muted,
  setMuted,
  focused = false,
  onFocus,
  children,
  ...rest
}: PropsWithChildren<{
  id: string;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  focused: boolean;
  onFocus: (id: string) => void;
  [_: string]: any;
}>) {
  const { data } = useKnownEntityQuery({
    variables: { id },
  });

  const handle = get(data, ["knownEntity", "handle"], "Anonymous");
  const assets = get(data, ["knownEntity", "assets"], []);

  const toggleFocus = useCallback(
    () => (focused ? onFocus(undefined) : onFocus(id)),
    [focused, id, onFocus],
  );

  const style = useSpring({
    height: focused ? ASSETS_EXTENT : 0,
    opacity: focused ? 1 : 0,
  });

  return (
    <Container {...rest}>
      <Handle>
        <span onClick={toggleFocus}>{handle}</span>
        <MuteButton
          alt={muted ? "muted" : "unmuted"}
          onClick={() => setMuted(!muted)}
          src={muted ? mutedImage : unmutedImage}
        />
      </Handle>
      <AssetsContainer style={style}>
        <StyledAssetsList assets={assets}>{children}</StyledAssetsList>
      </AssetsContainer>
    </Container>
  );
}
