import { get } from "lodash-es";
import { useEntityQuery } from "graphql";
import EntityId from "context/EntityId";

export default function useEntityAssets() {
  const [entityId] = EntityId.useContainer();
  const { data, loading, error } = useEntityQuery({
    variables: { id: entityId },
    pollInterval: 5000,
  });
  const assets = get(data, "entity.ownedAssets", []);

  return { assets, loading, error };
}
