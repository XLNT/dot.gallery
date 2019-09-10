import React, { PropsWithChildren } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";

const Button = styled.div`
  font-family: ${fromTheme("secondaryFontFamily")};
  color: red;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-style: italic;
  }
`;

export default function EnterButton({
  children = "Enter",
  ...rest
}: PropsWithChildren<{ [_: string]: any }>) {
  return <Button {...rest}>{children}</Button>;
}
