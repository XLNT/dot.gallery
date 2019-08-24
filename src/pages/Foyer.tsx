import { ExhibitionProps, Flow } from "./ExhibitionProps";
import React from "react";
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
    </Container>
  );
}
