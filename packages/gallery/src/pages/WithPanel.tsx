import { animated, useSpring } from "react-spring";
import ForcedPanelState from "context/ForcedPanelState";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import PanelState from "context/PanelState";
import PanelVisibility from "context/PanelVisibility";
import React, { PropsWithChildren, useCallback } from "react";
import arrow from "static/arrow.svg";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useDimensions from "react-use-dimensions";

const Backboard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${fromTheme("background")};
`;

const Content = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
`;

const PanelContainer = styled(animated.div)`
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PanelButton = styled(({ canTogglePanel, panelWidth, ...props }) => (
  <animated.span {...props} />
))`
  user-select: none;
  z-index: 10;
  position: absolute;
  bottom: -1.75rem;
  right: calc(1rem + ${({ panelWidth }) => panelWidth}px);
  font-size: 1rem;
  padding: 0.75rem;

  background: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};

  cursor: pointer;
  border: 4px solid ${fromTheme("primary")};

  transition: transform 0.1s ease-in;

  display: ${({ canTogglePanel }) => (canTogglePanel ? "flex" : "none")};

  transform-origin: right;
  transform: rotate(90deg);
`;

const Inner = styled.div`
  position: relative;

  padding: 0.5rem;
  border: 4px solid ${fromTheme("primary")};
  height: 100%;
  background: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};

  display: flex;
`;

const PanelActionText = styled.div`
  color: ${fromTheme("panelText")};
  display: ${({ isOpen }) => (isOpen ? "none" : "inherit")};
`;

const PanelContentElement = styled.div`
  flex: 1;
  display: flex;
  width: 33vw;
`;

const Arrow = styled(animated.img)`
  width: 1rem;
  height: 1rem;
`;

export default function Panel({ children }: PropsWithChildren<{}>) {
  const { forcedState } = ForcedPanelState.useContainer();
  const [isVisible] = PanelVisibility.useContainer();
  const [isOpen, setPanelState, hydrated] = PanelState.useContainer();

  const togglePanel = useCallback(() => setPanelState(!isOpen), [isOpen, setPanelState]);

  const [panelRef, { width: panelWidth }] = useDimensions();

  const canTogglePanel = forcedState === null;
  const showPanel = forcedState === null ? hydrated && isOpen : forcedState;

  const { x, width, deg, opacity } = useSpring({
    opacity: isVisible ? 1 : 0,
    x: showPanel ? 0 : 1 * (panelWidth || 0),
    width: showPanel ? panelWidth || 0 : 0,
    deg: showPanel ? 90 : -90,
    from: {
      x: document.body.clientWidth,
      opacity: isVisible ? 1 : 0,
    },
  });

  return (
    <Backboard>
      <Content style={{ width: width.interpolate(w => `calc(100% - ${w}px)`) }}>{children}</Content>
      <PanelContainer
        ref={panelRef}
        style={{
          transform: x.interpolate(x => `translateX(${x}px)`),
          opacity,
          pointerEvents: opacity.interpolate(o => (o === 0 ? "none" : "all")),
        }}
      >
        <Inner>
          <PanelButton
            onClick={canTogglePanel ? togglePanel : null}
            canTogglePanel={canTogglePanel}
            panelWidth={panelWidth}
          >
            <PanelAction.Target as={PanelActionText} isOpen={isOpen} />
            <Arrow
              src={arrow}
              style={{
                transform: deg.interpolate(d => `rotate(${d}deg)`),
              }}
            />
          </PanelButton>
          <PanelContent.Target as={PanelContentElement} />
        </Inner>
      </PanelContainer>
    </Backboard>
  );
}
