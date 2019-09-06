import { ExhibitionProps, Flow } from "./ExhibitionProps";
import React, { useCallback } from "react";
import arrow from "static/grey_arrow.svg";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Video = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SkipButton = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: ${fromTheme("background")};
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.img`
  margin-left: 0.5rem;
  width: 1rem;
  height: 1rem;
  transform: rotate(180deg);
`;

export default function Foyer({ setFlow }: ExhibitionProps<void>) {
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);

  const goGallery = useCallback(() => setFlow(Flow.Gallery), [setFlow]);

  return (
    <>
      <Video autoPlay onEnded={goGallery}>
        <source src="https://cdn.bydot.app/foyer.mp4" type="video/mp4" />
      </Video>
      <SkipButton onClick={goGallery}>
        Skip <Arrow src={arrow} />
      </SkipButton>
    </>
  );
}
