import React from "react";
import styled from "styled-components";

import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;
`;

const Text = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Subtext = styled.div`
  margin-top: 1rem;
`;

export default function TicketSuccess() {
  useSuggestedPanelState(false);
  useEnforcePanelVisibility(false);

  return (
    <Container>
      <Text>Ticket purchase successful!</Text>
      <Subtext>Check your email for a link to the exhibition.</Subtext>
    </Container>
  );
}
