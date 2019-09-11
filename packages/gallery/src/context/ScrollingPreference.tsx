import { ScrollDirection } from "lib/direction";
import { createContainer } from "unstated-next";
import useStorage from "hook/useStorage";

export default createContainer(() =>
  useStorage<ScrollDirection>("scrollingPreference", ScrollDirection.Inverted),
);
