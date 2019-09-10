import { animated, useTransition } from "react-spring";
import React, { PropsWithChildren } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";

const Content = styled(animated.div)`
  background-color: ${fromTheme("panel")};
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default function WithContentTransition({
  children,
}: PropsWithChildren<{}>) {
  const contentTransitions = useTransition(
    React.Children.toArray(children),
    null,
    {
      initial: { transform: "scale(1)", opacity: 0 },
      from: { transform: "scale(1.05)", opacity: 0 },
      enter: { transform: "scale(1)", opacity: 1 },
      leave: { transform: "scale(0.95)", opacity: 0 },
    },
  );

  return (
    <>
      {contentTransitions.map(({ item, key, props }) => (
        <Content key={key} style={props}>
          {item}
        </Content>
      ))}
    </>
  );
}
