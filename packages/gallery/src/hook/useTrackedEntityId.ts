import { decode } from "jsonwebtoken";
import { useEffect, useMemo } from "react";
import ReactGA from "react-ga";

import EntityToken from "context/EntityToken";

export default function useTrackedEntityId() {
  const [token] = EntityToken.useContainer();
  const decoded = useMemo(() => token && decode(token), [token]);

  useEffect(() => {
    if (decoded && decoded["id"]) {
      ReactGA.set({ entityId: decoded["id"] });
    }
  }, [decoded]);
}
