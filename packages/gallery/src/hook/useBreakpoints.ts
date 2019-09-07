import MediaQuery from "context/MediaQuery";

export default function useBreakpoints<T>(
  values: T[] = [undefined, undefined, undefined],
) {
  return values[MediaQuery.useContainer()];
}
