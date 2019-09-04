import contentful from "client/contentful";
import usePromise from "react-use-promise";

export default function(entryId: string) {
  return usePromise(() => contentful.getEntry<any>(entryId), [
    entryId,
    contentful,
  ]);
}
