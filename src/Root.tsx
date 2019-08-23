import "normalize.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader";
import React from "react";

import Exhibition from "pages/Exhibition";
import ExhibitionThemeProvider from "theme/ExhibitionThemeProvider";
import ForcedPanelState from "context/ForcedPanelState";
import Fullscreen from "context/Fullscreen";
import Home from "pages/Home";
import PanelState from "context/PanelState";
import WithPanel from "pages/WithPanel";
import makeClient from "client/client";
import nest from "lib/nest";
import theme from "theme/theme";
import useConstant from "hook/useConstant";

const GlobalStyle = createGlobalStyle`
`;

const Providers = nest([
  Fullscreen.Provider,
  PanelState.Provider,
  ForcedPanelState.Provider,
  ApolloProvider,
  ExhibitionThemeProvider,
]);

function Root() {
  const client = useConstant(() => makeClient());

  return (
    <>
      <GlobalStyle />
      <Providers theme={theme} client={client}>
        <>
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
