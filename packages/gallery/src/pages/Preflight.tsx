import {
  AnimatedValue,
  animated,
  config,
  interpolate,
  useSprings,
  useTrail,
} from "react-spring";
import {
  Direction,
  ScrollDirection,
  directionFor,
  invertForPreference,
  keycodeFor,
} from "lib/direction";
import { ExhibitionProps, Flow } from "./ExhibitionProps";
import { get } from "lodash-es";
import { humanize } from "lib/errorCodes";
import { useCurrentEntityQuery, useSetHandleMutation } from "operations";
import ControlledVideo from "components/ControlledVideo";
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
import ScrollingPreference from "context/ScrollingPreference";
import arrows from "static/arrows.svg";
import styled from "styled-components";
import useBreakpoints from "hook/useBreakpoints";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useKey from "use-key-hook";
import useMobileRedirect from "hook/useMobileRedirect";
import usePreloadedFoyer from "hook/usePreloadedFoyer";
import useRequiredLogin from "hook/useRequiredLogin";
import useRequiredTicket from "hook/useRequiredTicket";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const EXTENT = 300;

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
  margin-left: 5rem;
  margin-right: 5rem;
`;

const StyledEnterButton = styled(EnterButton)`
  font-size: 4rem;
`;

const Column = styled.div`
  flex: 1;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const Action = styled(animated.div)`
  height: ${EXTENT}px;

  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

const PreflightContainer = styled(animated.div)`
  height: ${EXTENT}px;

  display: flex;
  flex-shrink: 0;
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

  const [
    scrollingPreference,
    setScrollingPreference,
  ] = ScrollingPreference.useContainer();

  useMobileRedirect(
    `/notice?${new URLSearchParams({
      title: "Mobile Not Yet Supported",
      subtitle:
        "Mobile devices are not yet supported by dot.gallery. Please experience the exhibition on a desktop computer in the meantime.",
    })}`,
  );

  usePreloadedFoyer();
  const { setFullscreen } = Fullscreen.useContainer();
  const flexDirection = useBreakpoints(["column", "column", "row"]);
  const ref = useRef();
  const columnHeight = 500; // TODO: size
  const height = columnHeight || document.body.clientHeight / 2;

  const [currentStep, setCurrentStep] = useState(0);
  const { data, loading: fetchingHandle } = useCurrentEntityQuery();

  const handleRef = useRef<HTMLInputElement>();
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
        title: "Arrows help you navigate.",
        subtitle: "Give it a try.",
        // eslint-disable-next-line react/display-name
        element: (focused = false) => (
          <>
            <img src={arrows}></img>
          </>
        ),
      },
      {
        title: "Adjust your audio.",
        subtitle:
          "These works exists in pixels and waves. Set your volume accordingly.",
        // eslint-disable-next-line react/display-name
        element: (focused = false) => (
          <ControlledVideo
            src="https://cdn.bydot.app/dot.gallery_audio_check.mp4"
            playing={focused}
            loop
          />
        ),
      },
      // {
      //   title: "You are not alone.",
      //   subtitle:
      //     "Everyone viewing a work can talk with one another. Make sure your voice is heard.",
      //   // eslint-disable-next-line react/display-name
      //   element: (focused = false) => (
      //     <RequestUserMedia
      //       audio
      //       share
      //       microphonePermissionDenied={() =>
      //         setPermissionState(PermissionState.Denied)
      //       }
      //       onError={() => setPermissionState(PermissionState.Denied)}
      //       onSuccess={() => setPermissionState(PermissionState.Available)}
      //       render={getMedia => (
      //         <StyledEnterButton
      //           onClick={e => {
      //             setPermissionState(PermissionState.Pending);
      //             return getMedia(e);
      //           }}
      //           disabled={
      //             permissionState === PermissionState.Available ||
      //             permissionState === PermissionState.Pending
      //           }
      //         >
      //           {permissionState === PermissionState.Available
      //             ? "Granted"
      //             : permissionState === PermissionState.Denied
      //             ? "Denied"
      //             : "Grant"}
      //         </StyledEnterButton>
      //       )}
      //     />
      //   ),
      // },
      // {
      //   title: "Be who you are.",
      //   subtitle:
      //     "Enter the name you want others to see. You can mute yourself or others.",
      //   // eslint-disable-next-line react/display-name
      //   element: (focused = false) => (
      //     <HandleInputContainer>
      //       <HandleInput
      //         ref={handleRef}
      //         onSubmit={onHandleSubmit}
      //         disabled={fetchingHandle}
      //         defaultValue={handle}
      //       />
      //       {hasHandle && <HelpText>You have set your handle 👍</HelpText>}
      //       {loading && <HelpText>Submitting...</HelpText>}
      //       {error && <HelpText>{humanize(error)}</HelpText>}
      //     </HandleInputContainer>
      //   ),
      // },
      {
        title: "Give and receive.",
        subtitle:
          "Drag a token onto a work and the work will give you something in return.",
        // eslint-disable-next-line react/display-name
        element: (focused = false) => (
          <>
            <img src="https://cdn.bydot.app/token.png"></img>
          </>
        ),
      },
      {
        title: "Be where you are.",
        subtitle:
          "The gallery can only be viewed in full-screen. These works demand 100% of your pixels and your attention. When you click ENTER you will enter full-screen and migrate into the gallery.",
        // eslint-disable-next-line react/display-name
        element: (focused = false) => (
          <>
            <StyledEnterButton onClick={goFoyer}>Enter</StyledEnterButton>
          </>
        ),
      },
    ],
    [goFoyer],
  );

  const goNext = useCallback(
    () =>
      setCurrentStep(step => {
        // // block until we have audio
        // if (permissionState === PermissionState.Unasked && step === 1) {
        //   return step;
        // }

        // block until we have handle
        // if (!hasHandle && step === 2) {
        //   return step;
        // }

        // defocus handle input if available
        handleRef.current && handleRef.current.blur();

        return Math.min(step + 1, steps.length - 1);
      }),
    [steps.length],
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
  const middleTop = height / 2 - EXTENT / 2;
  const trail = useSprings(
    steps.length,
    steps.map((step, i) => ({
      transform: `translateY(${middleTop - currentStep * EXTENT}px)`,
    })),
  );

  const handleKey = useCallback(
    (pressedKey: number) => {
      const dir = directionFor(pressedKey);
      let sp = scrollingPreference;
      if (currentStep === 0) {
        sp =
          dir === Direction.Up
            ? ScrollDirection.Natural
            : ScrollDirection.Inverted;
        setScrollingPreference(sp);
      }

      const normalized = invertForPreference(sp, dir);

      switch (normalized) {
        case Direction.Up:
          return goPrev();
        case Direction.Down:
          return goNext();
      }
    },
    [currentStep, goNext, goPrev, scrollingPreference, setScrollingPreference],
  );

  useKey(
    handleKey,
    { detectKeys: [Direction.Up, Direction.Down].map(keycodeFor) },
    { dependencies: [handleKey] },
  );

  return (
    <Container direction={flexDirection}>
      <Column ref={ref}>
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
            title={steps[index].title}
            subtitle={steps[index].subtitle}
          />
        ))}
      </Column>
      <Column>
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
            {steps[index].element(index === currentStep)}
          </Action>
        ))}
      </Column>
    </Container>
  );
}
