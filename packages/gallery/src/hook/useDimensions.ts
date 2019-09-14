import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

type Dimensions = Pick<DOMRectReadOnly, "width" | "height">;

export default function useDimensions(
  ref: RefObject<HTMLElement>,
  initialDimensions: Dimensions = { width: 0, height: 0 },
): Dimensions {
  const [dimensions, _setDimensions] = useState<Dimensions>(initialDimensions);
  const handleResize: ResizeObserverCallback = useCallback(
    entries => entries.length && _setDimensions(entries[0].contentRect),
    [],
  );

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [handleResize, ref]);

  return dimensions;
}
