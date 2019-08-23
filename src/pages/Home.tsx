import PanelState from "context/PanelState";
import React from "react";

export default function Home() {
  const [isPanelOpen, setPanelState, hydrated] = PanelState.useContainer();

  return (
    <div>
      {isPanelOpen ? "true" : "false"}{" "}
      <button onClick={() => setPanelState(!isPanelOpen)}>+</button> {hydrated}
    </div>
  );
}
