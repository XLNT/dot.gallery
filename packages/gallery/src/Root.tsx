import "normalize.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { DndProvider } from "react-dnd";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader";
import HTML5Backend from "react-dnd-html5-backend";
import React from "react";

import EntityToken from "context/EntityToken";
import Exhibition from "pages/Exhibition";
import ExhibitionThemeProvider from "theme/ExhibitionThemeProvider";
import ForcedPanelState from "context/ForcedPanelState";
import Fullscreen from "context/Fullscreen";
import Home from "pages/Home";
import Journey from "context/Journey";
import Login from "pages/Login";
import MediaQuery from "context/MediaQuery";
import Modal from "context/Modal";
import PanelState from "context/PanelState";
import PanelVisibility from "context/PanelVisibility";
import TicketSuccess from "pages/TicketSuccess";
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

  /* * {
    box-sizing: content-box;
  } */
`;

const Providers = nest([
  Fullscreen.Provider,
  PanelState.Provider,
  ForcedPanelState.Provider,
  Journey.Provider,
  PanelVisibility.Provider,
  ApolloProvider,
  ExhibitionThemeProvider,
  EntityToken.Provider,
  MediaQuery.Provider,
  DndProvider,
  Router,
]);

function Root() {
  const client = useConstant(() => makeClient());

  return (
    <>
      <Providers theme={theme} client={client} backend={HTML5Backend}>
        <>
          <GlobalStyle />
          <WithPanel>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/ticket-success" exact component={TicketSuccess} />
              <Route path="/:slug([eE]\d\d[sS]\d\d)" component={Exhibition} />
              <Route component={Home} />
            </Switch>
          </WithPanel>
          <Modal.Target />
        </>
      </Providers>
    </>
  );
}

export default process.env.NODE_ENV === "development"
  ? hot(module)(Root)
  : Root;
