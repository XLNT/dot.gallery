import { ExhibitionProps, Flow } from "./ExhibitionProps";
import PanelContent from "context/PanelContent";
import React from "react";
import WithContentTransition from "components/WithContentTransition";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Foyer({ setFlow }: ExhibitionProps<void>) {
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
