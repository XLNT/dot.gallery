import { ExhibitionProps, Flow } from "./ExhibitionProps";
import Fullscreen from "context/Fullscreen";
import React, { useCallback } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import timeout from "lib/timeout";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem;
`;

const ActionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EnterButton = styled.span`
  font-size: 5rem;
  font-weight: bold;
  color: ${fromTheme("secondary")};
  text-transform: uppercase;
  cursor: pointer;
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

function PreflightStep({ title, subtitle }: { title: string; subtitle: string }) {
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
    subtitle: "Give it a try.",
  },
  {
    title: "Give and receive.",
    subtitle: "Drag a token onto a work and the work will give you something in return.",
  },
  {
    title: "Be where you are.",
    subtitle:
      "The gallery can only be viewed in full-screen. These works demand 100% of your pixels and your attention. When you click ENTER you will enter full-screen and migrate into the gallery.",
  },
];

export default function Preflight({ exhibition, show, setFlow }: ExhibitionProps<void>) {
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);
  const { setFullscreen } = Fullscreen.useContainer();

  const goFoyer = useCallback(async () => {
    if (process.env.NODE_ENV !== "development") {
      setFullscreen(true);
      await timeout(1000);
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
        <EnterButton onClick={goFoyer}>Enter</EnterButton>
      </ActionContainer>
    </Container>
  );
}
