import "normalize.css";

import React from "react";
import { hot } from "react-hot-loader";
import { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { FullscreenProvider } from "context/useFullscreen";
import nest from "lib/nest";

import makeClient from "./client/client";

import useConstant from "hook/useConstant";
import Home from "pages/Home";
import Exhibition from "pages/Exhibition";

const GlobalStyle = createGlobalStyle`

`;

const Providers = nest([FullscreenProvider, ApolloProvider]);

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
      </Providers>
    </>
  );
}

export default process.env.NODE_ENV === "development" ? hot(module)(Root) : Root;
