import React, { useEffect, useRef } from "react";

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

  return <video ref={ref} {...rest}></video>;
}
