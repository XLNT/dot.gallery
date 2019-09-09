import usePromise from "react-use-promise";

import EntryCache from "context/EntryCache";
import contentful from "client/contentful";

export default function useContentfulEntry(entryId: string) {
  const cache = EntryCache.useContainer();

  return usePromise(async () => {
    if (!cache.current[entryId]) {
      cache.current[entryId] = await contentful.getEntry<any>(entryId);
    }
    return cache.current[entryId];
  }, [entryId, contentful]);
}
