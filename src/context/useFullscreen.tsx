import React, { createContext, useContext, PropsWithChildren } from "react";
import { useFullscreen as _useFullscreen } from "@straw-hat/react-fullscreen";

export const FullscreenContext = createContext<ReturnType<typeof _useFullscreen>>(null);

export function FullscreenProvider(props: PropsWithChildren<{}>) {
  const value = _useFullscreen(window.document.body);

  return <FullscreenContext.Provider {...props} value={value} />;
}

export default function useFullscreen() {
  return useContext(FullscreenContext);
}
