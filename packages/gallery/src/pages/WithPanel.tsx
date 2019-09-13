import { ZIndex } from "lib/zIndex";
import { animated, config, useSpring } from "react-spring";
import ForcedPanelState from "context/ForcedPanelState";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import PanelState from "context/PanelState";
import PanelVisibility from "context/PanelVisibility";
import React, { PropsWithChildren, useCallback, useRef } from "react";
import arrow from "static/arrow.svg";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useBreakpoints from "hook/useBreakpoints";
import useComponentSize from "@rehooks/component-size";

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
`;

const PanelContentElement = styled(animated.div)`
  position: relative;
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
`;

const Arrow = styled(animated.img)`
  width: 1rem;
  height: 1rem;
`;

export default function Panel({ children }: PropsWithChildren<{}>) {
  const { forcedState } = ForcedPanelState.useContainer();
  const [isVisible] = PanelVisibility.useContainer();
  const [isOpen, setPanelState, hydrated] = PanelState.useContainer();
  const [panelAction] = PanelAction.useContainer();

  const overlayButton = useBreakpoints([true, true, false]);
  const compressContent = useBreakpoints([false, false, true]);
  const panelExtentRatio = useBreakpoints([90, 90, 33]);

  const togglePanel = useCallback(() => setPanelState(!isOpen), [
    isOpen,
    setPanelState,
  ]);

  const backboardRef = useRef<HTMLDivElement>(null);
  const { width: backboardWidth } = useComponentSize(backboardRef);

  const buttonRef = useRef<HTMLImageElement>(null);
  const { width: buttonWidth } = useComponentSize(buttonRef);

  const actionRef = useRef<HTMLDivElement>(null);
  const { width: actionWidth, height: actionHeight } = useComponentSize(
    actionRef,
  );
  console.log(actionWidth, actionHeight);

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

    config: config.molasses,
    from: {
      opacity: isVisible ? 1 : 0,
    },
  });

  const actionStyle = useSpring({
    opacity: showPanel ? 1 : 0,
    marginLeft: `${showPanel ? 0.5 : 0}rem`,
    width: showPanel ? actionWidth : 0,

    config: config.molasses,
    from: {
      width: 0,
    },
  });

  return (
    <Backboard ref={backboardRef}>
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
            style={{
              right: buttonRightOffset,
              bottom: buttonBottomOffset,
              display: progress.interpolate(p => (p > 0.5 ? "flex" : "none")),
            }}
            onClick={canTogglePanel ? togglePanel : null}
          >
            <Arrow
              ref={buttonRef}
              src={arrow}
              style={{
                transform: arrowTransform,
              }}
            />
            <PanelActionText ref={actionRef} style={actionStyle}>
              <div>{panelAction}</div>
            </PanelActionText>
          </PanelButton>
          <PanelContent.Target as={PanelContentElement} />
        </Inner>
      </PanelContainer>
    </Backboard>
  );
}
