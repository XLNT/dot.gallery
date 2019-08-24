import { ExhibitionProps, Flow } from "./ExhibitionProps";
import Fullscreen from "context/Fullscreen";
import PanelContent from "context/PanelContent";
import React, { useCallback } from "react";
import WithContentTransition from "components/WithContentTransition";
import styled from "styled-components";
import timeout from "lib/timeout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Preflight({ exhibition, show, setFlow }: ExhibitionProps<void>) {
  const { setFullscreen } = Fullscreen.useContainer();
  const goFoyer = useCallback(async () => {
    process.env.NODE_ENV !== "development" && setFullscreen(true);
    await timeout(2000);
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
