import { ExhibitionProps, Flow } from "./ExhibitionProps";
import PanelContent from "context/PanelContent";
import React from "react";
import WithContentTransition from "components/WithContentTransition";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Preflight({ exhibition, show, setFlow }: ExhibitionProps<void>) {
  return (
    <Container>
      <div>Preflight</div>
      exhibition {exhibition} show {show}
      <button onClick={() => setFlow(Flow.Foyer)}>next</button>
      <PanelContent.Source>
        <WithContentTransition>Test</WithContentTransition>
      </PanelContent.Source>
    </Container>
  );
}
