import { useRef } from "react";

export default function useNonreactive<T>(value: T) {
  const ref = useRef<T>();
  ref.current = value;
  return ref;
}
