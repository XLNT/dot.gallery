import "regenerator-runtime/runtime";

import { render } from "react-dom";
import React from "react";

import Root from "./Root";

function renderApp() {
  render(<Root />, document.getElementById("root"));
}

renderApp();

module.hot && module.hot.accept();
