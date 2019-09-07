import { animated, config, useSpring } from "react-spring";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import Button from "components/Button";
import arrow from "static/arrow.svg";
import fromTheme from "theme/fromTheme";
import useHovered from "hook/useHovered";

const Container = styled(Button)`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 0.5rem 0.75rem;
  background-color: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  height: 10rem;
  width: 10rem;

  font-size: 2rem;

  display: flex;
  flex-direction: column;
`;

const Action = styled.div`
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 0.5em;
`;

const Arrow = styled(animated.img)`
  margin-top: auto;
  align-self: flex-end;
  width: 1.5rem;
  height: 1.5rem;
`;

export default function BlockButton({
  children,
  disabled = false,
  subtitle,
  ...rest
}: PropsWithChildren<{
  [_: string]: any;
}>) {
  const [hovered, bind] = useHovered();

  const style = useSpring({
    transform: `translateX(${
      hovered && !disabled ? "3%" : "0px"
    }) rotate(180deg)`,
    config: config.stiff,
  });

  return (
    <Container {...bind} {...rest} disabled={disabled}>
      <Action>{children}</Action>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Arrow style={style} src={arrow} />
    </Container>
  );
}
