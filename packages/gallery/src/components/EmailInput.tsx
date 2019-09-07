import React, { useCallback, useRef } from "react";
import styled from "styled-components";

import ArrowButton from "./ArrowButton";
import fromTheme from "theme/fromTheme";

const Form = styled.form`
  position: relative;
`;

const StyledInput = styled.input`
  border: 4px solid ${fromTheme("primary")};
  font-size: 1rem;
  padding: 0.75rem 0.5rem;
  width: 100%;
`;

const Arrow = styled(ArrowButton)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 2rem;
  height: 100%;
  transform: rotate(180deg);
  margin-right: 0.5rem;
  padding: 0.25rem;
  cursor: pointer;
`;

// eslint-disable-next-line react/display-name
export default React.forwardRef(function EmailInput(
  { className, onSubmit, ...rest }: any,
  ref,
) {
  const form = useRef<HTMLFormElement>();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(e);
    },
    [onSubmit],
  );

  return (
    <Form ref={form} className={className} onSubmit={handleSubmit}>
      <StyledInput
        ref={ref}
        type="email"
        placeholder="email@example.com"
        autoFocus={true}
        {...rest}
      />
      <Arrow type="submit" />
    </Form>
  );
});
