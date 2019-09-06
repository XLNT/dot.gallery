import { animated, config, useSpring } from "react-spring";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import Button from "components/Button";
import arrow from "static/arrow.svg";
import fromTheme from "theme/fromTheme";
import useHovered from "hook/useHovered";

const Container = styled(Button)`
  padding: 0.5rem 0.75rem;
  background-color: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};
  cursor: pointer;
  height: 10rem;
  width: 10rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Action = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const Arrow = styled(animated.img)`
  align-self: flex-end;
  width: 1.5rem;
  height: 1.5rem;
`;

export default function BlockButton({
  children,
  ...rest
}: PropsWithChildren<{
  [_: string]: any;
}>) {
  const [hovered, bind] = useHovered();

  const style = useSpring({
    transform: `translateX(${hovered ? "3%" : "0px"}) rotate(180deg)`,
    config: config.stiff,
  });

  return (
    <Container {...bind} {...rest}>
      <Action>{children}</Action>
      <Arrow style={style} src={arrow} />
    </Container>
  );
}
