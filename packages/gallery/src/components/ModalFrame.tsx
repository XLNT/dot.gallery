import React from "react";
import styled from "styled-components";

import fromTheme from "theme/fromTheme";
import useBreakpoints from "hook/useBreakpoints";

const Frame = styled.div`
  background-color: ${fromTheme("panel")};
  padding: 0.75rem 1.25rem;

  min-height: ${({ extent }) => extent}vh;
  max-width: ${({ extent }) => extent}vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function ModalFrame(props) {
  const extent = useBreakpoints([80, 60, 40]);
  return <Frame {...props} extent={extent} />;
}
