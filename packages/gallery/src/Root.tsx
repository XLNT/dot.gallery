import "normalize.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { DndProvider } from "react-dnd";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader";
import { init as initSentry } from "@sentry/browser";
import HTML5Backend from "react-dnd-html5-backend";
import React, { useMemo } from "react";
import ReactGA from "react-ga";

import AnimatedSwitch, { RouteConfig } from "components/AnimatedSwitch";
import Authorize from "pages/Authorize";
import EntityToken from "context/EntityToken";
import EntryCache from "context/EntryCache";
import Exhibition from "pages/Exhibition";
import ExhibitionThemeProvider from "theme/ExhibitionThemeProvider";
import ForcedPanelState from "context/ForcedPanelState";
import Fullscreen from "context/Fullscreen";
import Home from "pages/Home";
import Interactors from "Interactors";
import Journey from "context/Journey";
import MediaQuery from "context/MediaQuery";
import Modal from "context/Modal";
import PanelAction from "context/PanelAction";
import PanelState from "context/PanelState";
import PanelVisibility from "context/PanelVisibility";
import ScrollingPreference from "context/ScrollingPreference";
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
initSentry({ dsn: config.SENTRY_DSN, environment: process.env.NODE_ENV });

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
  PanelAction.Provider,
  ScrollingPreference.Provider,
  DndProvider,
  Router,
]);

function Root() {
  const client = useConstant(() => makeClient());
  const backend = useConstant(() => HTML5Backend);

  const routes = useMemo<RouteConfig[]>(
    () => [
      { path: "/authorize", exact: true, component: Authorize },
      { path: "/ticket-success", exact: true, component: TicketSuccess },
      {
        path: "/:slug([eE]\\d\\d\\d[sS]\\d\\d\\d)",
        component: Exhibition,
      },
      { component: Home },
    ],
    [],
  );

  return (
    <>
      <Providers theme={theme} client={client} backend={backend}>
        <>
          <GlobalStyle />
          <Interactors />
          <WithPanel>
            <Switch>
              {routes.map(route => (
                <Route key={route.path || "default"} {...route} />
              ))}
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
