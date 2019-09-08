import React from "react";
import styled from "styled-components";

import fromTheme from "theme/fromTheme";
import useBreakpoints from "hook/useBreakpoints";

const Frame = styled.div`
  background-color: ${fromTheme("panel")};
  padding: 0.75rem 1.25rem;

  min-height: ${({ height }) => height}vh;
  max-width: ${({ width }) => width}vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function ModalFrame(props) {
  const width = useBreakpoints([80, 60, 40]);
  const height = useBreakpoints([60, 60, 40]);
  return <Frame {...props} width={width} height={height} />;
}
