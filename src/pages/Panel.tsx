import { animated, useSpring } from "react-spring";
import ForcedPanelState from "context/ForcedPanelState";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import PanelState from "context/PanelState";
import React, { useCallback } from "react";
import arrow from "components/arrow.svg";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PanelButton = styled(({ canTogglePanel, panelWidth, ...props }) => (
  <animated.span {...props} />
))`
  z-index: 9;
  position: absolute;
  bottom: -1.5rem;
  right: calc(1rem + ${({ panelWidth }) => panelWidth}px);
  font-size: 1rem;
  padding: 0.75rem;

  white-space: nowrap;

  cursor: pointer;
  border: 4px solid black;

  transition: transform 0.1s ease-in;

  display: ${({ canTogglePanel }) => (canTogglePanel ? "flex" : "none")};

  transform-origin: right;
  transform: rotate(90deg);
`;

const Inner = styled(animated.div)`
  position: relative;

  padding: 0.5rem;
  border: 4px solid black;
  height: 100%;
`;

const Content = styled.div`
  width: 33vw;
`;

export default function Panel() {
  const { forcedState } = ForcedPanelState.useContainer();
  const [isOpen, setPanelState, hydrated] = PanelState.useContainer();

  const togglePanel = useCallback(() => setPanelState(!isOpen), [isOpen, setPanelState]);

  const [panelRef, { width: panelWidth }] = useDimensions();

  const canTogglePanel = forcedState === null;
  const showPanel = forcedState === null ? hydrated && isOpen : forcedState;

  const { x, deg } = useSpring({
    x: showPanel ? 0 : -1 * (panelWidth || 0),
    deg: showPanel ? 90 : -90,
  });

  return (
    <Container ref={panelRef}>
      <Inner style={{ transform: x.interpolate(x => `translateX(${-x}px)`) }}>
        <PanelButton
          onClick={canTogglePanel ? togglePanel : null}
          canTogglePanel={canTogglePanel}
          panelWidth={panelWidth}
        >
          {!isOpen && <PanelAction.Target as="span" />}{" "}
          <animated.img
            src={arrow}
            style={{
              transform: deg.interpolate(d => `rotate(${d}deg)`),
            }}
          />
        </PanelButton>
        <PanelContent.Target as={Content} />
      </Inner>
    </Container>
  );
}
