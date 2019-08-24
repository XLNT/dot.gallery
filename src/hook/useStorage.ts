import { useCallback, useEffect, useState } from "react";
import localforage from "localforage";

type Container<T> = {
  value: T;
};

/**
 * useLocalStorageState is useState but it persists to localStorage
 *
 * inspired by:
 * https://github.com/streamich/react-use/blob/master/src/localforage.ts
 * https://usehooks.com/useLocalStorage/
 */
export default function useStorage<T>(
  key: string,
  initialValue: T,
): [T, (state: T) => void, boolean] {
  const [hydrated, setHydrated] = useState<boolean>(false);

  const [state, _setState] = useState<T>(initialValue);

  const setState = useCallback(
    async (value: T) => {
      try {
        await localforage.setItem<T>(key, value);
      } catch {}

      _setState(value);
    },
    [key],
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const value = await localforage.getItem<T>(key);

        if (!mounted) return;
        _setState(value === null ? initialValue : value);
      } catch {}

      if (!mounted) return;
      setHydrated(true);
    })();

    return () => (mounted = false);
  });

  return [state, setState, hydrated];
}
