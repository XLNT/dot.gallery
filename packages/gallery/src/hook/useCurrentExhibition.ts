import { ShowState, getShowState } from "lib/shows";
import { find, get } from "lodash-es";
import { useCurrentExhibitionQuery } from "../operations";

export default function useCurrentExhibition() {
  const { loading, error, data } = useCurrentExhibitionQuery({
    pollInterval: 60 * 1000,
  });
  const exhibition = get(data, ["currentExhibition"]);

  const shows = get(exhibition, ["shows"], []);
  const show: typeof exhibition["shows"][0] = find(
    shows,
    show => getShowState(show.opensAt, show.closesAt) === ShowState.Open,
  );
  return { exhibition, show, loading, error };
}
