import { ExhibitionProps, Flow } from "pages/ExhibitionProps";
import { ZIndex } from "lib/zIndex";
import { animated, config, useSpring, useTransition } from "react-spring";
import Journey from "context/Journey";
import JourneyIcon from "components/JourneyIcon";
import React, { useCallback, useState } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useDimensions from "react-use-dimensions";

const ExitLayer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;

  display: flex;
  justify-content: center;

  z-index: ${({ proposingExit }) =>
    proposingExit ? ZIndex.ExitOpen : ZIndex.Lowest};
`;

const ExitProposal = styled(animated.div)`
  max-width: 80%;
  padding: 1rem;
`;

const InnerExitProposal = styled.div`
  border: 4px solid ${fromTheme("primary")};
  padding: 0.75rem;
  background: #fff;
`;

const JourneyButton = styled.div`
  z-index: ${ZIndex.Journey};
  position: absolute;
  top: 1rem;
  right: 2rem;
  width: 4.25rem;
  height: 4.25rem;

  cursor: pointer;

  display: flex;

  transform: scale(1);
  transition: transform 150ms linear, box-shadow 150ms linear;
  &:hover,
  &:focus,
  &:active {
    box-shadow: 0px 0px 2rem -1rem rgba(0, 0, 0, 0.75);
    transform: scale(1.05);
  }
`;

const ExitButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${fromTheme("secondary")};
  color: ${fromTheme("secondaryText")};
  text-transform: uppercase;
`;

const ThemeLink = styled.a`
  cursor: pointer;
  color: ${fromTheme("secondary")};
`;

export default function JourneyAndExit({ setFlow }: ExhibitionProps<{}>) {
  const [exitHovered, setExitHovered] = useState<boolean>(false);
  const onExitMouseEnter = useCallback(() => setExitHovered(true), []);
  const onExitMouseLeave = useCallback(() => setExitHovered(false), []);

  const [journey] = Journey.useContainer();
  const [proposingExit, setProposingExit] = useState<boolean>(false);
  const [proposalRef, { height: proposalExtent }] = useDimensions();
  const { y } = useSpring<{ y: number }>({
    y: proposingExit ? 0 : -1 * (proposalExtent || document.body.clientHeight),
  });

  const showExitHoveredState = exitHovered || proposingExit;
  const exitButtonTransitions = useTransition(showExitHoveredState, null, {
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });

  const goExit = useCallback(() => setFlow(Flow.GiftShop), [setFlow]);

  const onExitButtonClick = useCallback(() => {
    if (proposingExit) {
      goExit();
    } else {
      setProposingExit(true);
    }
  }, [goExit, proposingExit]);

  const cancelExitProposal = useCallback(() => setProposingExit(false), []);

  return (
    <>
      <ExitLayer proposingExit={proposingExit}>
        <ExitProposal
          ref={proposalRef}
          style={{ transform: y.interpolate(y => `translateY(${y}px)`) }}
        >
          <InnerExitProposal>
            You are about to exit the gallery.
            <br />
            Do you want to{" "}
            <ThemeLink onClick={goExit}>continue to exit</ThemeLink> or{" "}
            <ThemeLink onClick={cancelExitProposal}>
              stay a little longer?
            </ThemeLink>
          </InnerExitProposal>
        </ExitProposal>
      </ExitLayer>
      <JourneyButton
        onMouseEnter={onExitMouseEnter}
        onMouseLeave={onExitMouseLeave}
        onClick={onExitButtonClick}
      >
        {exitButtonTransitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            {item ? (
              <ExitButton>Exit</ExitButton>
            ) : (
              <ExitButton>
                <JourneyIcon size={5} journey={journey} />
              </ExitButton>
            )}
          </animated.div>
        ))}
      </JourneyButton>
    </>
  );
}
