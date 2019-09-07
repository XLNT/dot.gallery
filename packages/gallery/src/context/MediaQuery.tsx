import { createContainer } from "unstated-next";

import useMedia from "hook/useMedia";

const BREAKPOINTS = [
  "(min-width: 550px)", // sm
  "(min-width: 750px)", // md
  "(min-width: 960px)", // lg
];

export default createContainer(() => useMedia(BREAKPOINTS, [0, 1, 2], 0));
