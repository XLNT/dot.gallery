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
  padding: 1rem;
`;

export default function WithContentTransition({
  children,
}: PropsWithChildren<{}>) {
  const contentTransitions = useTransition(
    React.Children.toArray(children),
    null,
    {
      initial: { transform: "translateY(2rem)", opacity: 0 },
      from: { transform: "translateY(2rem)", opacity: 0 },
      enter: { transform: "translateY(0)", opacity: 1 },
      leave: { transform: "translateY(-2rem)", opacity: 0 },
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
