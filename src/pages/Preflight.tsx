import { ExhibitionProps, Flow } from "./ExhibitionProps";
import React from "react";
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
    </Container>
  );
}
