import React from "react";
import { render } from "react-dom";

import Root from "./Root";

function renderApp() {
  render(<Root />, document.getElementById("root"));
}

renderApp();

module.hot && module.hot.accept();
