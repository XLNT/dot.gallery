import { ZIndex } from "lib/zIndex";
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
import useBreakpoints from "hook/useBreakpoints";
import useDimensions from "react-use-dimensions";

const Backboard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${fromTheme("background")};
  overflow: hidden;
`;

const Content = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
`;

const PanelContainer = styled(animated.div)`
  box-sizing: content-box;

  z-index: ${ZIndex.Panel};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
`;

const PanelButton = styled(animated.span)`
  user-select: none;
  z-index: ${ZIndex.Panel};
  position: absolute;
  font-size: 1rem;
  padding: 0.75rem;

  background: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};

  cursor: pointer;
  border: 4px solid ${fromTheme("primary")};

  transition: transform 0.1s ease-in;

  transform-origin: 25% 50%;
  transform: rotate(-90deg);
`;

const Inner = styled.div`
  position: relative;

  border: 4px solid ${fromTheme("primary")};
  height: 100%;
  background: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};

  display: flex;
`;

const PanelActionText = styled(animated.div)`
  overflow: none;
  font-weight: bold;
  text-transform: uppercase;
  color: ${fromTheme("panelText")};
  transform-origin: 25% 50%;
`;

const PanelContentElement = styled(animated.div)`
  position: relative;
  flex: 1;
  display: flex;
  width: 100%;

  height: 100%;

  &:after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(transparent, white);
  }
`;

const Arrow = styled(animated.img)`
  width: 1rem;
  height: 1rem;
`;

export default function Panel({ children }: PropsWithChildren<{}>) {
  const { forcedState } = ForcedPanelState.useContainer();
  const [isVisible] = PanelVisibility.useContainer();
  const [isOpen, setPanelState, hydrated] = PanelState.useContainer();

  const overlayButton = useBreakpoints([true, true, false]);
  const compressContent = useBreakpoints([false, false, true]);
  const panelExtentRatio = useBreakpoints([90, 90, 33]);

  const togglePanel = useCallback(() => setPanelState(!isOpen), [
    isOpen,
    setPanelState,
  ]);

  const [
    ref,
    { width: backboardWidth = document.body.clientWidth },
  ] = useDimensions();
  const [buttonRef, { width: buttonWidth = 0 }] = useDimensions();

  const panelWidth = (panelExtentRatio / 100.0) * backboardWidth;

  const canTogglePanel = forcedState === null;
  const showPanel = forcedState === null ? hydrated && isOpen : forcedState;

  const {
    width,
    panelWidth: animatedPanelWidth,
    buttonRightOffset,
    buttonBottomOffset,
    opacity,
    transform,
    arrowTransform,
    progress,
    actionOpacity,
  } = useSpring({
    progress: isVisible ? 1 : 0,
    opacity: isVisible ? 1 : 0,
    transform: `translateX(${showPanel ? 0 : panelWidth}px)`,
    arrowTransform: `rotate(${showPanel ? -90 : 90}deg)`,
    panelWidth,
    width: backboardWidth - (compressContent && showPanel ? panelWidth : 0),
    buttonRightOffset:
      panelWidth - buttonWidth + (showPanel && overlayButton ? -0 : 0),
    buttonBottomOffset: showPanel && overlayButton ? 16 : 0,
    actionOpacity: showPanel ? 0 : 1,
    from: {
      opacity: isVisible ? 1 : 0,
    },
  });

  return (
    <Backboard ref={ref}>
      <Content style={{ width }}>{children}</Content>
      <PanelContainer
        style={{
          width: animatedPanelWidth,
          transform,
          opacity,
          pointerEvents: progress.interpolate(p => (p > 0.5 ? "all" : "none")),
        }}
      >
        <Inner>
          <PanelButton
            ref={buttonRef}
            style={{
              right: buttonRightOffset,
              bottom: buttonBottomOffset,
              display: progress.interpolate(p => (p > 0.5 ? "flex" : "none")),
            }}
            onClick={canTogglePanel ? togglePanel : null}
          >
            <Arrow
              src={arrow}
              style={{
                transform: arrowTransform,
              }}
            />
            <PanelAction.Target
              as={PanelActionText}
              style={{
                opacity: actionOpacity,
                display: actionOpacity.interpolate(o =>
                  o > 0.5 ? "block" : "none",
                ),
              }}
            />
          </PanelButton>
          <PanelContent.Target as={PanelContentElement} />
        </Inner>
      </PanelContainer>
    </Backboard>
  );
}
