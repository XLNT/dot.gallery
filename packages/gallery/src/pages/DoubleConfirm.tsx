import { ExhibitionProps, Flow } from "./ExhibitionProps";
import EnterButton from "components/EnterButton";
import Fullscreen from "context/Fullscreen";
import React, { useCallback } from "react";
import sleep from "lib/sleep";
import styled from "styled-components";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p``;

const LinkButton = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const StyledEnterButton = styled(EnterButton)`
  font-size: 4rem;
`;

export default function DoubleConfirm({ setFlow }: ExhibitionProps<void>) {
  useSuggestedPanelState(false);
  useEnforcePanelVisibility(false);

  const { setFullscreen } = Fullscreen.useContainer();

  const goGallery = useCallback(async () => {
    await setFullscreen(true);
    setFlow(Flow.Gallery);
  }, [setFlow, setFullscreen]);

  const goExit = useCallback(async () => {
    setFlow(Flow.GiftShop);
  }, [setFlow]);

  return (
    <Container>
      <Text>The dot.gallery can only be viewed in full-screen.</Text>
      <StyledEnterButton onClick={goGallery}>Return</StyledEnterButton>
      <Text>
        Or exit the dot.gallery{" "}
        <LinkButton onClick={goExit}>from here.</LinkButton>
      </Text>
    </Container>
  );
}
