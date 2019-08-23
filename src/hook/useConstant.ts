import { useRef } from "react";

// inspired by, but simpler version of:
// https://github.com/Andarist/use-constant/blob/master/src/index.ts
export default function useConstant<T>(fn: () => T) {
  const ref = useRef<T>();

  if (!ref.current) {
    ref.current = fn();
  }

  return ref.current;
}
