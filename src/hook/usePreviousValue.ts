import { Comparator } from "lodash";
import { useRef } from "react";

export default function usePreviousValue<T>(value: T, isEqual: Comparator<T> = (a, b) => a === b) {
  const prev = useRef<T>(null);
  const curr = useRef<T>(null);

  if (!isEqual(prev.current, curr.current)) {
    prev.current = curr.current;
  }

  if (!isEqual(curr.current, value)) {
    curr.current = value;
  }

  return prev.current;
}
