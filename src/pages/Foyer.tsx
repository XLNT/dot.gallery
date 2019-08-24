import { ExhibitionProps, Flow } from "./ExhibitionProps";
import { preloadImage } from "lib/preload";
import PanelContent from "context/PanelContent";
import React, { useEffect } from "react";
import WithContentTransition from "components/WithContentTransition";
import styled from "styled-components";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Foyer({ setFlow }: ExhibitionProps<void>) {
  useSuggestedPanelState(false);
  const { exhibition } = useCurrentExhibition();
  useEffect(() => {
    if (exhibition) {
      // preload all of the uris
      Promise.all(exhibition.rooms.map(room => room.asset.uri).map(preloadImage));
    }
  }, [exhibition]);

  return (
    <Container>
      <div>Foyer</div>
      <button onClick={() => setFlow(Flow.Gallery)}>next</button>
      <PanelContent.Source>
        <WithContentTransition>Test</WithContentTransition>
      </PanelContent.Source>
    </Container>
  );
}
