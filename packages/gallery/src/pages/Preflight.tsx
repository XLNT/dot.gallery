import { ExhibitionProps, Flow } from "./ExhibitionProps";
import { useRedeemTicketMutation } from "operations";
import EnterButton from "components/EnterButton";
import Fullscreen from "context/Fullscreen";
import React, { useCallback } from "react";
import sleep from "lib/sleep";
import styled from "styled-components";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useRequiredLogin from "hook/useRequiredLogin";
import useRequiredTicket from "hook/useRequiredTicket";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 5rem;
`;

const StyledEnterButton = styled(EnterButton)`
  font-size: 4rem;
`;

const ActionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
`;

const PreflightContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const PreflightHeader = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const PreflightSubtitle = styled.span``;

function PreflightStep({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <PreflightContainer>
      <PreflightHeader>{title}</PreflightHeader>
      <PreflightSubtitle>{subtitle}</PreflightSubtitle>
    </PreflightContainer>
  );
}

const steps = [
  {
    title: "Arrows navigate between works.",
    subtitle: "Up, Down, Left, Right. Simple.",
  },
  {
    title: "Give and receive.",
    subtitle:
      "Drag a token onto a work and the work will give you something in return.",
  },
  {
    title: "Be where you are.",
    subtitle:
      "The gallery can only be viewed in full-screen. These works demand 100% of your pixels and your attention. When you click ENTER you will enter full-screen and migrate into the gallery.",
  },
];

export default function Preflight({ setFlow }: ExhibitionProps<void>) {
  useRequiredLogin();
  useRequiredTicket();
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);
  const { setFullscreen } = Fullscreen.useContainer();

  const goFoyer = useCallback(async () => {
    if (process.env.NODE_ENV !== "development") {
      await setFullscreen(true);
    }

    setFlow(Flow.Foyer);
  }, [setFlow, setFullscreen]);

  return (
    <Container>
      <StepsContainer>
        {steps.map(step => (
          <PreflightStep key={step.title} {...step} />
        ))}
      </StepsContainer>
      <ActionContainer>
        <StyledEnterButton onClick={goFoyer}>Enter</StyledEnterButton>
      </ActionContainer>
    </Container>
  );
}
