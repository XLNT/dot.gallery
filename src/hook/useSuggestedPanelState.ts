import { useEffect } from "react";
import PanelState from "context/PanelState";

export default function useSuggestedPanelState(state: boolean) {
  const [, setPanelState] = PanelState.useContainer();

  useEffect(() => {
    setPanelState(state);
  }, [setPanelState, state]);
}
