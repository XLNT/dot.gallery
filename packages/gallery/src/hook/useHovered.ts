import { useCallback, useState } from "react";

export default function useHovered() {
  const [hovered, setHovered] = useState(false);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  return [hovered, { onMouseEnter, onMouseLeave }];
}
