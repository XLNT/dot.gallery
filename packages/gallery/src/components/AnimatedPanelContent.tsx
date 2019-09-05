import PanelContent from "context/PanelContent";
import React, { PropsWithChildren } from "react";
import WithContentTransition from "./WithContentTransition";

export default function AnimatedPanelContent({
  children,
}: PropsWithChildren<{}>) {
  return (
    <PanelContent.Source>
      <WithContentTransition>{children}</WithContentTransition>
    </PanelContent.Source>
  );
}
