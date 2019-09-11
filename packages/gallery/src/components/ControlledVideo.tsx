import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Video = styled.video`
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

  useEffect(() => {
    if (playing) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [playing]);

  return <Video ref={ref} {...rest}></Video>;
}
