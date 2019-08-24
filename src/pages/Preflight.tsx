import { ExhibitionProps, Flow } from "./ExhibitionProps";
import Fullscreen from "context/Fullscreen";
import PanelContent from "context/PanelContent";
import React, { useCallback } from "react";
import WithContentTransition from "components/WithContentTransition";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Preflight({ exhibition, show, setFlow }: ExhibitionProps<void>) {
  const { setFullscreen } = Fullscreen.useContainer();
  const goFoyer = useCallback(() => {
    setFullscreen(true);
    setFlow(Flow.Foyer);
  }, [setFlow, setFullscreen]);

  return (
    <Container>
      <div>Preflight</div>
      exhibition {exhibition} show {show}
      <button onClick={goFoyer}>next</button>
      <PanelContent.Source>
        <WithContentTransition>Test</WithContentTransition>
      </PanelContent.Source>
    </Container>
  );
}
