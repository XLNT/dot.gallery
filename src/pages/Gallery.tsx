import { ExhibitionProps } from "./ExhibitionProps";
import React from "react";
import styled from "styled-components";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Backboard = styled.div`
  position: relative;
  flex: 1;
`;

const Layer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Canvas = styled(Layer)`
  padding: 2rem;
  background-color: red;
`;

export default function Gallery({  }: ExhibitionProps<void>) {
  useSuggestedPanelState(true);

  return (
    <Backboard>
      <Canvas />
    </Backboard>
  );
}
