import { animated, config, useSpring, useTransition } from "react-spring";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import Button from "components/Button";
import arrow from "static/arrow.svg";
import fromTheme from "theme/fromTheme";
import spinner from "static/spinner.svg";
import useHovered from "hook/useHovered";

const Container = styled(Button)`
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${fromTheme("panel")};
  color: ${fromTheme("panelText")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  height: 10rem;
  width: 10rem;

  font-size: 2rem;
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

const Layer = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
`;

const LoadingLayer = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.img`
  width: 50%;
  height: 50%;
`;

export default function BlockButton({
  children,
  loading = false,
  disabled = false,
  subtitle,
  ...rest
}: PropsWithChildren<{
  loading: boolean;
  disabled: boolean;
  subtitle: string;
  [_: string]: any;
}>) {
  const [hovered, bind] = useHovered();

  if (loading) {
    disabled = true;
  }

  const style = useSpring({
    transform: `translateX(${
      hovered && !disabled ? "3%" : "0px"
    }) rotate(180deg)`,
    config: config.stiff,
  });

  const transitions = useTransition(
    loading ? (
      <LoadingLayer>
        <Spinner src={spinner} />
      </LoadingLayer>
    ) : (
      <>
        <Action>{children}</Action>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Arrow style={style} src={arrow} />
      </>
    ),
    () => (loading ? "laoding" : "not-loading"),
    {
      initial: { transform: "scale(1)", opacity: 1 },
      from: { transform: "scale(1.1)", opacity: 0 },
      enter: { transform: "scale(1)", opacity: 1 },
      leave: { transform: "scale(0.95)", opacity: 0 },
    },
  );

  return (
    <Container {...bind} {...rest} disabled={disabled}>
      {transitions.map(({ item, key, props }) => (
        <Layer key={key} style={props}>
          {item}
        </Layer>
      ))}
    </Container>
  );
}
