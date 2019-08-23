import { animated, useSpring } from "react-spring";
import PanelState from "context/PanelState";
import React, { useCallback } from "react";
import styled from "styled-components";
import useDimensions from "react-use-dimensions";

const Container = styled(animated.div)`
  z-index: 10;
  position: absolute;
  top: 0rem;
  right: 0;
  bottom: 0rem;

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
`;

const PanelButton = styled(animated.div)`
  z-index: 9;
  position: absolute;
  bottom: 0;
  left: -60px;
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1rem;
  padding: 0.75rem;

  cursor: pointer;
  border: 1px solid black;

  transition: transform 0.1s ease-in;

  &:hover {
    transform: scale(1.05);
  }
`;

const Inner = styled(animated.div)`
  position: relative;

  padding: 0.5rem;
  border: 1px solid black;
  height: 100%;
`;

const Content = styled.div`
  width: 33vw;
`;

export default function Panel() {
  const [isOpen, setPanelState, hydrated] = PanelState.useContainer();

  const togglePanel = useCallback(() => setPanelState(!isOpen), [isOpen, setPanelState]);

  const [panelRef, { width: panelWidth }] = useDimensions();

  const { x } = useSpring({
    x: hydrated && isOpen ? 0 : -1 * (panelWidth || 0),
  });

  return (
    <Container ref={panelRef}>
      <Inner style={{ transform: x.interpolate(x => `translateX(${-x}px)`) }}>
        <PanelButton onClick={togglePanel}>{isOpen ? "▶" : "◀"}</PanelButton>
        <Content>fuck yeah</Content>
      </Inner>
    </Container>
  );
}
