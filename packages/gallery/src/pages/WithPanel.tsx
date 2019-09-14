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
import useDimensions from "hook/useDimensions";

const BUTTON_EXTENT = 50; // px
const OFFSCREEN_PADDING = 60; // px, larger than button

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
  z-index: ${ZIndex.Panel};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
`;

const PanelContainerInner = styled.div`
  position: relative;

  height: 100%;
  border: 4px solid ${fromTheme("primary")};
  background: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};

  display: flex;
`;

const PanelButtonContainer = styled(animated.div)`
  user-select: none;

  z-index: ${ZIndex.Panel};
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: calc(1rem + 1px); /* the web is a good platform */
`;

const PanelButtonInner = styled.div`
  position: relative;

  margin-right: calc(${BUTTON_EXTENT}px + 1rem);
`;

const PanelButton = styled(animated.div)`
  position: absolute;
  left: 0;
  bottom: 0;

  cursor: pointer;
  border: 4px solid ${fromTheme("primary")};
  background: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};

  font-size: 1rem;
  padding: 0.75rem;

  display: flex;
  flex-direction: row;
`;

const PanelActionText = styled(animated.div)`
  position: relative;
  overflow: hidden;

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
  const panelExtentRatio = useBreakpoints([0.9, 0.9, 0.33]);

  const togglePanel = useCallback(() => setPanelState(!isOpen), [
    isOpen,
    setPanelState,
  ]);

  const backboardRef = useRef<HTMLDivElement>(null);
  const { width: backboardWidth, height: backboardHeight } = useDimensions(
    backboardRef,
    { width: document.body.clientWidth, height: document.body.clientHeight },
  );

  const actionRef = useRef<HTMLDivElement>(null);
  const { width: actionWidth, height: actionHeight } = useDimensions(actionRef);

  const canTogglePanel = forcedState === null;
  const showPanel = forcedState === null ? hydrated && isOpen : forcedState;

  const panelWidth = panelExtentRatio * backboardWidth;
  const contentWidth =
    backboardWidth - (compressContent && showPanel ? panelWidth : 0);

  const {
    // content
    contentWidth: animatedContentWidth,

    // panel
    progress,
    opacity,
    transform,
    panelWidth: animatedPanelWidth,

    // button
    buttonRight,
    buttonTransformOrigin,
    arrowTransform,
    buttonTransform,

    // action
    actionOpacity,
    actionWidth: animatedActionWidth,
    actionTransform,
    actionMarginLeft,
  } = useSpring({
    // content
    contentWidth,

    // panel
    progress: isVisible ? 1 : 0,
    opacity: isVisible ? 1 : 0,
    transform: `translateX(${showPanel ? 0 : panelWidth}px)`,
    panelWidth,

    // button
    buttonRight: showPanel ? panelWidth : 0,
    buttonTransformOrigin: `${BUTTON_EXTENT / 2}px ${BUTTON_EXTENT / 2}px`,
    buttonTransform: `rotate(-90deg)`,
    arrowTransform: `rotate(${showPanel ? -90 : 90}deg)`,

    // action
    actionOpacity: showPanel ? 0 : 1,
    actionWidth: showPanel ? 0 : actionWidth,
    actionTransform: `translateX(${showPanel ? -0.5 : -0}rem)`,
    actionMarginLeft: `${showPanel ? 0 : 0.5}rem`,

    config: config.slow,
    from: {
      opacity: isVisible ? 1 : 0,
      buttonRight: -OFFSCREEN_PADDING,

      actionWidth: 0,
      actionTransform: `translateX(-0.5rem)`,
    },
  });

  return (
    <Backboard ref={backboardRef}>
      <Content style={{ width: animatedContentWidth }}>{children}</Content>
      <PanelContainer
        style={{
          width: animatedPanelWidth,
          transform,
          opacity,
          pointerEvents: progress.interpolate(p => (p > 0.5 ? "all" : "none")),
        }}
      >
        <PanelContainerInner>
          <PanelContent.Target as={PanelContentElement} />
        </PanelContainerInner>
      </PanelContainer>
      <PanelButtonContainer
        style={{
          right: buttonRight,
          opacity,
          pointerEvents: progress.interpolate(p => (p > 0.5 ? "all" : "none")),
        }}
      >
        <PanelButtonInner>
          <PanelButton
            style={{
              transformOrigin: buttonTransformOrigin,
              transform: buttonTransform,
            }}
            onClick={canTogglePanel ? togglePanel : null}
          >
            <Arrow
              src={arrow}
              style={{
                transform: arrowTransform,
              }}
            />
            <PanelActionText
              style={{
                opacity: actionOpacity,
                transform: actionTransform,
                width: animatedActionWidth,
                marginLeft: actionMarginLeft,
              }}
            >
              <div
                ref={actionRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                {panelAction}
              </div>
            </PanelActionText>
          </PanelButton>
        </PanelButtonInner>
      </PanelButtonContainer>
    </Backboard>
  );
}
