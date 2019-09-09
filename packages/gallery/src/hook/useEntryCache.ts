import { useRef } from "react";

export default function useEntryCache() {
  const cache = useRef({});

  return cache;
}
