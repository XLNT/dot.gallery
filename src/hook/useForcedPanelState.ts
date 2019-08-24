import { useEffect } from "react";
import ForcedPanelState from "context/ForcedPanelState";

export default function useForcedPanelState(state: boolean) {
  const { setForcedState, revokeForcedState } = ForcedPanelState.useContainer();

  useEffect(() => {
    setForcedState(state);

    return () => revokeForcedState();
  }, []);
}
