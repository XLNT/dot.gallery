import { Route, RouteProps, Switch } from "react-router";
import { animated, useTransition } from "react-spring";
import React from "react";
import styled from "styled-components";

import useRouter from "context/useRouter";

const RouteContainer = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
`;

export interface RouteConfig extends RouteProps {
  path?: string; // force single path declaraction
}

export default function AnimatedRoutes({ routes }: { routes: RouteConfig[] }) {
  const { location } = useRouter();
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: `translate3d(0, 0, 0)`, opacity: 1 },
    from: { transform: `translate3d(0, 0, 0)`, opacity: 0 },
    enter: { transform: `translate3d(0, 0, 0)`, opacity: 1 },
    leave: { transform: `translate3d(0, 0, 0)`, opacity: 0 },
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <RouteContainer key={key} style={props}>
          <Switch location={item}>
            {routes.map(route => (
              <Route key={route.path || "default"} {...route} />
            ))}
          </Switch>
        </RouteContainer>
      ))}
    </>
  );
}
