import "normalize.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { DndProvider } from "react-dnd";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader";
import HTML5Backend from "react-dnd-html5-backend";
import React from "react";
import ReactGA from "react-ga";

import EntityToken from "context/EntityToken";
import EntryCache from "context/EntryCache";
import Exhibition from "pages/Exhibition";
import ExhibitionThemeProvider from "theme/ExhibitionThemeProvider";
import ForcedPanelState from "context/ForcedPanelState";
import Fullscreen from "context/Fullscreen";
import Home from "pages/Home";
import Interactors from "Interactors";
import Journey from "context/Journey";
import Login from "pages/Login";
import MediaQuery from "context/MediaQuery";
import Modal from "context/Modal";
import PanelState from "context/PanelState";
import PanelVisibility from "context/PanelVisibility";
import TicketSuccess from "pages/TicketSuccess";
import Timezone from "context/Timezone";
import WithPanel from "pages/WithPanel";
import config from "config";
import fromTheme from "theme/fromTheme";
import makeClient from "client/client";
import nest from "lib/nest";
import theme from "theme/theme";
import useConstant from "hook/useConstant";

ReactGA.initialize(config.GA_TRACKING_ID);

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
  EntryCache.Provider,
  Journey.Provider,
  PanelVisibility.Provider,
  ApolloProvider,
  ExhibitionThemeProvider,
  EntityToken.Provider,
  MediaQuery.Provider,
  Timezone.Provider,
  DndProvider,
  Router,
]);

function Root() {
  const client = useConstant(() => makeClient());
  const backend = useConstant(() => HTML5Backend);

  return (
    <>
      <Providers theme={theme} client={client} backend={backend}>
        <>
          <GlobalStyle />
          <Interactors />
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
