import React from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";

const Spinner = styled.div`
  position: relative;
  width: 4.25rem;
  height: 4.25rem;
`;

const Bounce = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${fromTheme("secondary")};
  opacity: 0.6;

  position: absolute;
  top: 0;
  left: 0;

  animation: sk-bounce 2s infinite ease-in-out;

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const Bounce2 = styled(Bounce)`
  animation-delay: -1s;
`;

export default function LoadingAsset(props: {}) {
  return (
    <Spinner {...props}>
      <Bounce />
      <Bounce2 />
    </Spinner>
  );
}
