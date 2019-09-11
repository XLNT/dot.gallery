import {
  AnimatedValue,
  animated,
  config,
  interpolate,
  useSprings,
  useTrail,
} from "react-spring";
import { Direction, directionFor, keycodeFor } from "lib/rooms";
import { ExhibitionProps, Flow } from "./ExhibitionProps";
import { RequestUserMedia } from "@andyet/simplewebrtc";
import { get } from "lodash";
import { humanize } from "lib/errorCodes";
import { useCurrentEntityQuery, useSetHandleMutation } from "operations";
import EnterButton from "components/EnterButton";
import Fullscreen from "context/Fullscreen";
import HandleInput from "components/HandleInput";
import HelpText from "components/HelpText";
import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import arrows from "static/arrows.svg";
import styled from "styled-components";
import useBreakpoints from "hook/useBreakpoints";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useKey from "use-key-hook";
import usePreloadedFoyer from "hook/usePreloadedFoyer";
import useRequiredLogin from "hook/useRequiredLogin";
import useRequiredTicket from "hook/useRequiredTicket";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const EXTENT = 200;

enum PermissionState {
  Unasked,
  Pending,
  Available,
  Denied,
}

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
  height: ${EXTENT}px;

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
  height: ${EXTENT}px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
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

const HandleInputContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export default function Preflight({ setFlow }: ExhibitionProps<void>) {
  useRequiredLogin();
  useRequiredTicket();
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);

  usePreloadedFoyer();
  const { setFullscreen } = Fullscreen.useContainer();
  const [currentStep, setCurrentStep] = useState(0);
  const flexDirection = useBreakpoints(["column", "column", "row"]);
  const handleRef = useRef<HTMLInputElement>();
  const { data, loading: fetchingHandle } = useCurrentEntityQuery();
  const [setHandle, { loading, error }] = useSetHandleMutation({
    refetchQueries: ["CurrentEntity", "UserDataToken"],
    awaitRefetchQueries: true,
  });
  const handle = get(data, ["currentEntity", "handle"], "");
  const hasHandle = !!handle;

  const [permissionState, setPermissionState] = useState<PermissionState>(
    PermissionState.Unasked,
  );

  const goFoyer = useCallback(async () => {
    if (process.env.NODE_ENV !== "development") {
      await setFullscreen(true);
    }

    setFlow(Flow.Foyer);
  }, [setFlow, setFullscreen]);

  const onHandleSubmit = useCallback(async () => {
    await setHandle({ variables: { handle: handleRef.current.value } });
  }, [setHandle]);

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
          <RequestUserMedia
            audio
            share
            microphonePermissionDenied={() =>
              setPermissionState(PermissionState.Denied)
            }
            onError={() => setPermissionState(PermissionState.Denied)}
            onSuccess={() => setPermissionState(PermissionState.Available)}
            render={getMedia => (
              <StyledEnterButton
                onClick={e => {
                  setPermissionState(PermissionState.Pending);
                  return getMedia(e);
                }}
                disabled={
                  permissionState === PermissionState.Available ||
                  permissionState === PermissionState.Pending
                }
              >
                {permissionState === PermissionState.Available
                  ? "Granted"
                  : permissionState === PermissionState.Denied
                  ? "Denied"
                  : "Grant"}
              </StyledEnterButton>
            )}
          />
        ),
      },
      {
        title: "You are not alone.",
        subtitle:
          "Everyone viewing a work can talk with one another. Enter the name you want others to see. You can mute yourself or others.",
        element: (
          <HandleInputContainer>
            <HandleInput
              ref={handleRef}
              onSubmit={onHandleSubmit}
              disabled={fetchingHandle}
              defaultValue={handle}
            />
            {hasHandle && <HelpText>You have set your handle 👍</HelpText>}
            {loading && <HelpText>Submitting...</HelpText>}
            {error && <HelpText>{humanize(error)}</HelpText>}
          </HandleInputContainer>
        ),
      },
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
    [
      error,
      fetchingHandle,
      goFoyer,
      handle,
      hasHandle,
      loading,
      onHandleSubmit,
      permissionState,
    ],
  );

  const goNext = useCallback(
    () =>
      setCurrentStep(step => {
        // block until we have audio
        if (permissionState === PermissionState.Unasked && step === 1) {
          return step;
        }

        // block until we have handle
        if (!hasHandle && step === 2) {
          return step;
        }

        // defocus handle input if available
        handleRef.current && handleRef.current.blur();

        return Math.min(step + 1, steps.length - 1);
      }),
    [hasHandle, permissionState, steps.length],
  );

  const goPrev = useCallback(
    () => setCurrentStep(step => Math.max(step - 1, 0)),
    [],
  );

  const opacity = useTrail(steps.length, {
    opacity: 1,
    from: { opacity: 0 },
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

  const midpoint = Math.floor(steps.length / 2);
  const dist = midpoint - currentStep;
  const trail = useTrail(steps.length, {
    transform: `translateY(${dist * EXTENT}px)`,
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
    { detectKeys: [Direction.Up, Direction.Down].map(keycodeFor) },
    { dependencies: [goPrev, goNext] },
  );

  return (
    <Container direction={flexDirection}>
      <StepsContainer>
        {trail.map((props, index) => (
          <PreflightStep
            key={index}
            style={{
              ...props,
              opacity: interpolate(
                [
                  scalars[index].scalar.interpolate(
                    [midpoint, 0],
                    // we don't seem to have an overload for this range remap behavior...
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
        {trail.map((props, index) => (
          <Action
            key={index}
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
