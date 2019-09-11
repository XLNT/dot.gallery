import { Direction, keycodeFor } from "lib/rooms";
import { ExhibitionProps, Flow } from "./ExhibitionProps";
import { animated, useSpring } from "react-spring";
import { sleep } from "stanza/Utils";
import { useRedeemTicketMutation, useUserDataTokenQuery } from "operations";
import ControlledVideo from "components/ControlledVideo";
import React, { useCallback, useEffect, useState } from "react";
import arrow from "static/grey_arrow.svg";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useKey from "use-key-hook";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Backboard = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${fromTheme("primary")};
`;

const SkipButton = styled(animated.div)`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: ${fromTheme("background")};
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.img`
  margin-left: 0.5rem;
  width: 1rem;
  height: 1rem;
  transform: rotate(180deg);
`;

export default function Foyer({ setFlow }: ExhibitionProps<void>) {
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);

  useUserDataTokenQuery(); // preload token

  const [isFocused, setIsFocused] = useState(true);
  const [skipVisible, setSkipVisible] = useState(false);

  const [redeemTicket] = useRedeemTicketMutation();

  useEffect(() => {
    (async () => {
      try {
        await redeemTicket();
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          // ignore
          console.log("[dev] redeemTicket failed, ignoring...");
        } else {
          // TODO: handle this error with a redirect or notice or something
          throw error;
        }
      } finally {
        await sleep(30 * 1000);
        setSkipVisible(true);
      }
    })();
  }, [redeemTicket]);

  const goGallery = useCallback(() => {
    setIsFocused(false);
    setFlow(Flow.Gallery);
  }, [setFlow]);

  useKey(
    (pressedKey: number) => goGallery(),
    { detectKeys: [Direction.Right].map(keycodeFor) },
    { dependencies: [goGallery] },
  );

  const style = useSpring({
    opacity: skipVisible ? 1 : 0,
    from: { opacity: 0 },
  });

  return (
    <>
      <Backboard>
        <ControlledVideo
          src="https://cdn.bydot.app/foyer.mp4"
          playing={isFocused}
          autoPlay
          onEnded={goGallery}
        />
      </Backboard>
      <SkipButton onClick={goGallery} style={style}>
        Skip <Arrow src={arrow} />
      </SkipButton>
    </>
  );
}
