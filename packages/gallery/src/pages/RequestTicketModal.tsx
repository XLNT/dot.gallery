import React, { useCallback } from "react";
import styled from "styled-components";

import BlockButton from "components/BlockButton";
import useRouter from "context/useRouter";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(BlockButton)`
  margin-left: 1rem;
  margin-right: 1rem;
`;

export default function RequestTicketModal() {
  const { history } = useRouter();

  const goHave = useCallback(() => history.push("/have-ticket"), [history]);
  const goWant = useCallback(() => history.push("/want-ticket"), [history]);

  return (
    <Container>
      <StyledButton onClick={goHave}>I have a ticket.</StyledButton>
      <StyledButton onClick={goWant}>I want a ticket.</StyledButton>
    </Container>
  );
}
