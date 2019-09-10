import {
  AnimatedValue,
  animated,
  config,
  interpolate,
  useSprings,
  useTrail,
  useTransition,
} from "react-spring";
import { Direction, directionFor, keycodeFor } from "lib/rooms";
import { ExhibitionProps, Flow } from "./ExhibitionProps";
import EnterButton from "components/EnterButton";
import Fullscreen from "context/Fullscreen";
import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import arrows from "static/arrows.svg";
import styled from "styled-components";
import useBreakpoints from "hook/useBreakpoints";
import useDimensions from "react-use-dimensions";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useKey from "use-key-hook";
import useRequiredLogin from "hook/useRequiredLogin";
import useRequiredTicket from "hook/useRequiredTicket";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: space-between;
  margin: 2rem 5rem;
`;

const StyledEnterButton = styled(EnterButton)`
  font-size: 4rem;
`;

const ActionContainer = styled.div`
  flex: 1;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Action = styled(animated.div)`
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepsContainer = styled.div`
  flex: 1;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PreflightContainer = styled(animated.div)`
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PreflightHeader = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PreflightSubtitle = styled.span``;

// eslint-disable-next-line react/display-name
const PreflightStep = React.forwardRef<HTMLDivElement, any>(
  (
    {
      title,
      subtitle,
      ...rest
    }: PropsWithChildren<{
      title: string;
      subtitle: string;
      [_: string]: any;
    }>,
    ref,
  ) => {
    return (
      <PreflightContainer ref={ref} {...rest}>
        <PreflightHeader>{title}</PreflightHeader>
        <PreflightSubtitle>{subtitle}</PreflightSubtitle>
      </PreflightContainer>
    );
  },
);

export default function Preflight({ setFlow }: ExhibitionProps<void>) {
  useRequiredLogin();
  useRequiredTicket();
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);
  const { setFullscreen } = Fullscreen.useContainer();
  const [currentStep, setCurrentStep] = useState(0);
  const flexDirection = useBreakpoints(["column", "column", "row"]);

  const [firstRef, { height: itemHeight = 200 }] = useDimensions();
  const [firstActionRef, { height: actionHeight = 200 }] = useDimensions();

  const goFoyer = useCallback(async () => {
    if (process.env.NODE_ENV !== "development") {
      await setFullscreen(true);
    }

    setFlow(Flow.Foyer);
  }, [setFlow, setFullscreen]);

  const steps = useMemo(
    () => [
      {
        title: "Arrows navigate between works.",
        subtitle: "Give it a try.",
        element: (
          <>
            <img src={arrows}></img>
          </>
        ),
      },
      {
        title: "Adjust your audio.",
        subtitle:
          "These works exists in pixels and waves. Set your volume accordingly.",
        element: (
          <>
            <StyledEnterButton onClick={goFoyer}>Enter</StyledEnterButton>
          </>
        ),
      },
      // {
      //   title: "You are not alone.",
      //   subtitle:
      //     "Everyone viewing a work can talk with one another. Enter the name you want others to see. You can mute yourself or others.",
      //   element: (
      //     <>
      //       <StyledEnterButton onClick={goFoyer}>Enter</StyledEnterButton>
      //     </>
      //   ),
      // },
      {
        title: "Give and receive.",
        subtitle:
          "Drag a token onto a work and the work will give you something in return.",
        element: (
          <>
            <img src="https://cdn.bydot.app/token.png"></img>
          </>
        ),
      },
      {
        title: "Be where you are.",
        subtitle:
          "The gallery can only be viewed in full-screen. These works demand 100% of your pixels and your attention. When you click ENTER you will enter full-screen and migrate into the gallery.",
        element: (
          <>
            <StyledEnterButton onClick={goFoyer}>Enter</StyledEnterButton>
          </>
        ),
      },
    ],
    [goFoyer],
  );

  const goNext = useCallback(
    () => setCurrentStep(step => Math.min(step + 1, steps.length - 1)),
    [steps.length],
  );

  const goPrev = useCallback(
    () => setCurrentStep(step => Math.max(step - 1, 0)),
    [],
  );

  const opacity = useTrail(steps.length, {
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 400, friction: 240 },
  });

  const scalars = useSprings<
    { scalar: number },
    CSSProperties & AnimatedValue<{ scalar: number }>
  >(
    steps.length,
    steps.map((item, i) => ({
      scalar: Math.abs(currentStep - i),
      config: config.slow,
    })),
  );

  const actionScalars = useSprings<
    { scalar: number },
    CSSProperties & AnimatedValue<{ scalar: number }>
  >(
    steps.length,
    steps.map((item, i) => ({
      scalar: i === currentStep ? 1 : 0,
      config: config.slow,
    })),
  );

  const trail = useTrail(steps.length, {
    transform: `translateY(${(Math.floor(steps.length / 2) - currentStep) *
      itemHeight}px)`,
    config: config.slow,
  });

  const actionTrail = useTrail(steps.length, {
    transform: `translateY(${(Math.floor(steps.length / 2) - currentStep) *
      actionHeight}px)`,
    config: config.slow,
  });

  useKey(
    (pressedKey: number) => {
      switch (directionFor(pressedKey)) {
        case Direction.Up:
          return goPrev();
        case Direction.Down:
          return goNext();
      }
    },
    {
      detectKeys: [Direction.Up, Direction.Down].map(keycodeFor),
    },
    { dependencies: [goPrev, goNext] },
  );

  return (
    <Container direction={flexDirection}>
      <StepsContainer>
        {trail.map((props, index) => (
          <PreflightStep
            ref={index === 0 ? firstRef : undefined}
            key={index}
            style={{
              ...props,
              opacity: interpolate(
                [
                  scalars[index].scalar.interpolate(
                    [Math.floor(steps.length / 2), 0],
                    // we don't seemt to have an overload for this range remap behavior...
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    [0, 1],
                  ),
                  opacity[index].opacity,
                ],
                (s, o) => s * o,
              ),
            }}
            {...steps[index]}
          />
        ))}
      </StepsContainer>
      <ActionContainer>
        {actionTrail.map((props, index) => (
          <Action
            key={index}
            ref={index === 0 ? firstActionRef : undefined}
            style={{
              ...props,
              opacity: interpolate(
                [actionScalars[index].scalar, opacity[index].opacity],
                (s, o) => s * o,
              ),
            }}
          >
            {steps[index].element}
          </Action>
        ))}
      </ActionContainer>
    </Container>
  );
}
