import { get } from "lodash-es";
import { useCurrentExhibitionQuery } from "../operations";

export default function useCurrentExhibition() {
  const { loading, error, data } = useCurrentExhibitionQuery();
  const exhibition = get(data, ["currentExhibition"]);

  return { exhibition, loading, error };
}
