import { animated, config, interpolate, useSpring } from "react-spring";
import React, { useCallback, useRef } from "react";
import styled from "styled-components";

const Video = styled(animated.video)`
  height: 100%;
  width: 100%;
`;

export default function ControlledVideo({
  playing = false,
  ...rest
}: {
  playing: boolean;
  [_: string]: any;
}) {
  const ref = useRef<HTMLVideoElement>();

  const enforcePlaying = useCallback(async () => {
    if (playing) {
      if (ref.current) {
        try {
          await ref.current.play();
        } catch {
          // ignore
        }
      }
    }
  }, [playing]);

  const enforcePaused = useCallback(() => {
    if (!playing) {
      if (ref.current) {
        ref.current.pause();
      }
    }
  }, [playing]);

  const { volume } = useSpring({
    volume: playing ? 1.0 : 0.0,
    from: { volume: 0 },
    config: config.slow,
    onStart: enforcePlaying,
    onRest: enforcePaused,
  });

  interpolate([volume], v => console.log(v));

  return (
    <Video
      ref={ref}
      style={{
        volume: volume.interpolate(v => {
          if (ref.current) {
            // lmao
            ref.current.volume = v;
          }
          return v;
        }),
      }}
      {...rest}
    ></Video>
  );
}
