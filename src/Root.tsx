import "normalize.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader";
import React from "react";

import { DndProvider } from "react-dnd";
import EntityId from "context/EntityId";
import Exhibition from "pages/Exhibition";
import ExhibitionThemeProvider from "theme/ExhibitionThemeProvider";
import ForcedPanelState from "context/ForcedPanelState";
import Fullscreen from "context/Fullscreen";
import HTML5Backend from "react-dnd-html5-backend";
import Home from "pages/Home";
import Journey from "context/Journey";
import PanelState from "context/PanelState";
import PanelVisibility from "context/PanelVisibility";
import WithPanel from "pages/WithPanel";
import fromTheme from "theme/fromTheme";
import makeClient from "client/client";
import nest from "lib/nest";
import theme from "theme/theme";
import useConstant from "hook/useConstant";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${fromTheme("fontFamily")};
  }
`;

const Providers = nest([
  Fullscreen.Provider,
  PanelState.Provider,
  ForcedPanelState.Provider,
  Journey.Provider,
  EntityId.Provider,
  PanelVisibility.Provider,
  ApolloProvider,
  ExhibitionThemeProvider,
  DndProvider,
]);

function Root() {
  const client = useConstant(() => makeClient());

  return (
    <>
      <Providers theme={theme} client={client} backend={HTML5Backend}>
        <>
          <GlobalStyle />
          <WithPanel>
            <Router>
              <Route path="/" exact component={Home} />
              <Route path="/:slug" component={Exhibition} />
            </Router>
          </WithPanel>
        </>
      </Providers>
    </>
  );
}

export default process.env.NODE_ENV === "development" ? hot(module)(Root) : Root;
