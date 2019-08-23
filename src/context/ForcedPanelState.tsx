import { createContainer } from "unstated-next";
import { useCallback, useState } from "react";

export default createContainer(() => {
  const [forcedState, setForcedState] = useState(null);
  const revokeForcedState = useCallback(() => setForcedState(null), []);

  return { forcedState, setForcedState, revokeForcedState };
});
