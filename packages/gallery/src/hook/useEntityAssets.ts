import { get } from "lodash-es";
import { useCurrentEntityQuery } from "../operations";

export default function useEntityAssets() {
  const { data, loading, error } = useCurrentEntityQuery({
    pollInterval: 5000,
  });

  const assets = get(data, "entity.tradableAssets", []);

  return { assets, loading, error };
}
