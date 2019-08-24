import { ExhibitionProps, Flow } from "pages/ExhibitionProps";
import { animated, config, useSpring, useTransition } from "react-spring";
import Layer from "components/Layer";
import React, { useCallback, useMemo, useState } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useDimensions from "react-use-dimensions";

const ExitLayer = styled(Layer)`
  z-index: 5;
  display: flex;
  justify-content: center;
`;

const ExitProposal = styled(animated.div)`
  max-width: 80%;
  padding: 1rem;
`;

const InnerExitProposal = styled.div`
  border: 4px solid ${fromTheme("primary")};
  padding: 0.75rem;
  background: #fff;

  font-family: ${fromTheme("fontFamily")};
`;

const Journey = styled.div`
  z-index: 6;
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  font-family: ${fromTheme("fontFamily")};
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

  const [proposingExit, setProposingExit] = useState<boolean>(false);
  const [proposalRef, { height: proposalExtent }] = useDimensions();
  const { y } = useSpring<{ y: number }>({
    y: proposingExit ? 0 : -1 * (proposalExtent || document.body.clientHeight),
  });

  const journeySvg = useMemo(
    () => `<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="64" height="64" fill="white" stroke="#FF3333" stroke-width="4"/>
    <rect x="60" y="20" width="4" height="16" transform="rotate(90 60 20)" fill="#FF3333"/>
    <rect x="48" y="36" width="4" height="16" transform="rotate(-180 48 36)" fill="#FF3333"/>
    <rect x="12" y="48" width="4" height="16" transform="rotate(-180 12 48)" fill="#FF3333"/>
    <rect x="32" y="36" width="4" height="16" transform="rotate(-90 32 36)" fill="#FF3333"/>
    <rect x="56" y="20" width="4" height="16" fill="#FF3333"/>
    <rect x="56" y="32" width="4" height="16" fill="#FF3333"/>
    <rect x="68" y="44" width="4" height="12" transform="rotate(90 68 44)" fill="#FF3333"/>
    <rect y="48" width="4" height="12" transform="rotate(-90 0 48)" fill="#FF3333"/>
    </svg>`,
    [],
  );

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
      <ExitLayer>
        <ExitProposal
          ref={proposalRef}
          style={{ transform: y.interpolate(y => `translateY(${y}px)`) }}
        >
          <InnerExitProposal>
            You are about to exit the gallery, hands on the door.
            <br />
            Do you want to <ThemeLink onClick={goExit}>continue to exit</ThemeLink> or{" "}
            <ThemeLink onClick={cancelExitProposal}>stay a little longer?</ThemeLink>
          </InnerExitProposal>
        </ExitProposal>
      </ExitLayer>
      <Journey
        onMouseEnter={onExitMouseEnter}
        onMouseLeave={onExitMouseLeave}
        onClick={onExitButtonClick}
      >
        {exitButtonTransitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            {item ? (
              <ExitButton>Exit</ExitButton>
            ) : (
              <ExitButton dangerouslySetInnerHTML={{ __html: journeySvg }} />
            )}
          </animated.div>
        ))}
      </Journey>
    </>
  );
}
