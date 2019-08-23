import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import PanelState from "context/PanelState";
import React from "react";

export default function Home() {
  const [isPanelOpen, setPanelState, hydrated] = PanelState.useContainer();

  return (
    <div>
      This is the Home page.
      <PanelAction.Source>About</PanelAction.Source>
      <PanelContent.Source>
        <h1>dot.gallery</h1>
      </PanelContent.Source>
    </div>
  );
}
