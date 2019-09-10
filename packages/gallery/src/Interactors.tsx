import usePageview from "hook/usePageview";
import useTrackedEntityId from "hook/useTrackedEntityId";

export default function Interactors() {
  useTrackedEntityId();
  usePageview();

  return null;
}
