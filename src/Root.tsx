import "normalize.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader";
import React from "react";

import Exhibition from "pages/Exhibition";
import Fullscreen from "context/Fullscreen";
import Home from "pages/Home";
import Panel from "pages/Panel";
import PanelState from "context/PanelState";
import makeClient from "client/client";
import nest from "lib/nest";
import useConstant from "hook/useConstant";

const GlobalStyle = createGlobalStyle`

`;

const Providers = nest([Fullscreen.Provider, PanelState.Provider, ApolloProvider]);

function Root() {
  const client = useConstant(() => makeClient());

  return (
    <>
      <GlobalStyle />
      <Providers client={client}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/:slug" component={Exhibition} />
        </Router>
        <Panel />
      </Providers>
    </>
  );
}

export default process.env.NODE_ENV === "development" ? hot(module)(Root) : Root;
