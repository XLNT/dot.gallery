import { useEffect } from "react";
import PanelVisibility from "context/PanelVisibility";

export default function useEnforcePanelVisibility(visible: boolean) {
  const [, setVisibility] = PanelVisibility.useContainer();

  useEffect(() => {
    setVisibility(visible);
  }, [setVisibility, visible]);
}
