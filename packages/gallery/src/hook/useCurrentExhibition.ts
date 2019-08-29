import { get } from "lodash-es";
import { useCurrentExhibitionQuery } from "operations";

export default function useCurrentExhibition() {
  const { loading, error, data } = useCurrentExhibitionQuery();
  const exhibition = get(data, ["exhibitions", 0]);

  return { exhibition, loading, error };
}
