import { get } from "lodash-es";
import { useEffect, useRef } from "react";

import { contentTypeIsImage, contentTypeIsVideo } from "lib/contentType";
import { preloadImage, preloadVideo } from "lib/preload";
import EntryCache from "context/EntryCache";
import contentful from "client/contentful";

export default function usePreloadedEntries(ids: string[]) {
  const cache = EntryCache.useContainer();
  const didPreload = useRef(false);

  useEffect(() => {
    if (ids.length && !didPreload.current) {
      didPreload.current = true;
      // preload all of the room assets
      contentful
        .getEntries({
          "sys.id[in]": ids.join(","),
        })
        .then(entries => {
          // cache entries
          entries.items.forEach(entry => (cache.current[entry.sys.id] = entry));
          return get(entries, ["includes", "Asset"]);
        })
        .then(assets =>
          Promise.all(
            assets.map(async asset => {
              const uri = get(asset, "fields.file.url");
              const contentType: string = get(asset, "fields.file.contentType");

              if (contentTypeIsImage(contentType)) {
                await preloadImage(uri);
              } else if (contentTypeIsVideo(contentType)) {
                await preloadVideo(uri);
              }
            }),
          ),
        )
        .catch(error => {
          // ignore errors
          if (process.env.NODE_ENV === "development") {
            console.error(error);
          }
        });
    }
  }, [cache, ids, ids.length]);
}
