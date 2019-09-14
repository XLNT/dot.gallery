import { useCallback, useEffect } from "react";

type ValidEventKey = "keydown";

export default function useKeys(
  onKeypress: (key: number) => void,
  keyCodes: number[] = [],
  event: ValidEventKey = "keydown",
) {
  const handleEvent = useCallback(
    (event: KeyboardEvent) =>
      keyCodes.includes(event.which) && onKeypress(event.which),
    [keyCodes, onKeypress],
  );

  useEffect(() => {
    window.document.addEventListener<ValidEventKey>(event, handleEvent);
    return () =>
      window.document.removeEventListener<ValidEventKey>(event, handleEvent);
  }, [event, handleEvent]);
}
