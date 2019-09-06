import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Button = styled.div`
  color: red;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

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
