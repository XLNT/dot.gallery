import { Route, Switch } from "react-router";
import { ZIndex } from "lib/zIndex";
import { animated, useTransition } from "react-spring";
import { map } from "lodash-es";
import Modal from "context/Modal";
import React, { ComponentType, useCallback } from "react";
import styled from "styled-components";
import useKey from "use-key-hook";
import useRouter from "context/useRouter";

const Container = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  perspective: 1000px;
  background-color: rgba(0, 0, 0, 0.72);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  z-index: ${ZIndex.ModalBackground};
`;

export default function ModalView({
  routes,
  onDismiss,
}: {
  routes: { [path: string]: ComponentType<any> };
  onDismiss?: () => void;
}) {
  const { location } = useRouter();
  const isOpen = Object.keys(routes).includes(location.pathname);
  const transitions = useTransition(
    isOpen && location,
    location => location.pathname,
    {
      initial: { transform: "translateY(2rem)", opacity: 0 },
      from: { transform: "translateY(2rem)", opacity: 0 },
      enter: { transform: "translateY(0)", opacity: 1 },
      leave: { transform: "translateY(2rem)", opacity: 0 },
    },
  );

  const onContainerClick = useCallback(
    (e: Event) => {
      // only dismiss if the background itself was clicked
      if (e.target === e.currentTarget) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  useKey(
    () => isOpen && onDismiss(),
    {
      detectKeys: [27], // ESC
    },
    { dependencies: [isOpen, onDismiss] },
  );

  return (
    <>
      <Modal.Source>
        {transitions.map(({ item, key, props }) => {
          if (!item) {
            return null;
          }

          return (
            <Container
              key={key}
              onClick={onContainerClick}
              style={{
                opacity: props.opacity,
                pointerEvents: props.opacity.interpolate(o =>
                  o > 0.5 ? "all" : "none",
                ),
              }}
            >
              <animated.div style={props}>
                <Switch location={item}>
                  {map(routes, (node, path) => (
                    <Route key={path} exact path={path} component={node} />
                  ))}
                </Switch>
              </animated.div>
            </Container>
          );
        })}
      </Modal.Source>
    </>
  );
}
