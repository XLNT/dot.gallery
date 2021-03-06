import { Direction, keycodeFor } from "lib/direction";
import { ExhibitionProps, Flow } from "./ExhibitionProps";
import { animated, useSpring } from "react-spring";
import { useRedeemTicketMutation } from "operations";
import ControlledVideo from "components/ControlledVideo";
import React, { useCallback, useEffect, useState } from "react";
import arrow from "static/grey_arrow.svg";
import fromTheme from "theme/fromTheme";
import sleep from "lib/sleep";
import styled from "styled-components";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useKeys from "hook/useKeys";
import useRouter from "context/useRouter";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const MaxedVideo = styled(ControlledVideo)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${fromTheme("primary")};
  object-fit: cover;
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

  // useUserDataTokenQuery(); // preload token
  const { history } = useRouter();
  const [isFocused, setIsFocused] = useState(true);
  const [skipVisible, setSkipVisible] = useState(false);

  const [redeemTicket] = useRedeemTicketMutation();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await redeemTicket();
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          // ignore
          console.log("[dev] redeemTicket failed, ignoring...");
        } else {
          history.push(
            `/notice?${new URLSearchParams({
              title: "Ticket Required.",
              subtitle: "You do not have a ticket for this exhibition.",
            })}`,
          );
        }
      } finally {
        await sleep(30 * 1000);

        if (!mounted) return;
        setSkipVisible(true);
      }
    })();

    return () => (mounted = false);
  }, [history, redeemTicket]);

  const goGallery = useCallback(() => {
    setIsFocused(false);
    setFlow(Flow.Gallery);
  }, [setFlow]);

  useKeys(
    useCallback(() => goGallery(), [goGallery]),
    [Direction.Right].map(keycodeFor),
  );

  const style = useSpring({
    opacity: skipVisible ? 1 : 0,
    from: { opacity: 0 },
  });

  return (
    <>
      <MaxedVideo
        src="https://cdn.bydot.app/foyer.mp4"
        playing={isFocused}
        autoPlay
        onEnded={goGallery}
      />
      <SkipButton onClick={goGallery} style={style}>
        Skip <Arrow src={arrow} />
      </SkipButton>
    </>
  );
}
