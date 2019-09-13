import { useEffect } from "react";
import PanelAction from "context/PanelAction";

export default function usePanelAction(text: string) {
  const [, setPanelAction] = PanelAction.useContainer();

  useEffect(() => {
    setPanelAction(text);
  }, [setPanelAction, text]);
}
