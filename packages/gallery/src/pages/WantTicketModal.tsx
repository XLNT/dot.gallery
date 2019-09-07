import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { format } from "lib/exhibitionSlug";
import { formatCents } from "lib/money";
import { useCreateSessionMutation } from "operations";
import BlockButton from "components/BlockButton";
import EmailInput from "components/EmailInput";
import EntityToken from "context/EntityToken";
import ModalFrame from "components/ModalFrame";
import ModalHeader from "components/ModalHeader";
import ModalSubtitle from "components/ModalSubtitle";
import ModalTitle from "components/ModalTitle";
import fromTheme from "theme/fromTheme";
import stripe from "client/stripe";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useIsLoggedIn from "hook/useIsLoggedIn";
import useRouter from "context/useRouter";

const ModalAction = styled.div`
  margin-top: 3rem;
  justify-self: flex-end;
  display: flex;
  flex-direction: row;
`;

const StyledBlockButton = styled(BlockButton)`
  height: 6rem;
  width: 6rem;
  font-size: 1rem;

  background-color: ${fromTheme("background")};

  margin-right: 1rem;
`;

export default function WantTicketModal() {
  const isLoggedIn = useIsLoggedIn();

  const [loading, setLoading] = useState<boolean>(false);
  const [createSession] = useCreateSessionMutation();

  const { exhibition, show } = useCurrentExhibition();

  const onCreditCard = useCallback(async () => {
    setLoading(true);
    const {
      data: { createSession: sessionId },
    } = await createSession();

    stripe().redirectToCheckout({ sessionId });
  }, [createSession]);

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>I want a ticket.</ModalTitle>
        <ModalSubtitle>
          {isLoggedIn && "Welcome back!"}{" "}
          {exhibition ? (
            <>
              Admission is currently{" "}
              {formatCents(exhibition.currentTicketPrice)} and{" "}
              {exhibition.ticketsAvailable} tickets remain. Tickets are valid
              for any show during the {format(exhibition.number)} exhibition.
            </>
          ) : (
            "Loading exhibition info..."
          )}
        </ModalSubtitle>
      </ModalHeader>
      <ModalAction>
        <StyledBlockButton onClick={onCreditCard}>
          Credit Card
        </StyledBlockButton>
        <StyledBlockButton disabled subtitle="(coming soon)">
          Crypto
        </StyledBlockButton>
        <StyledBlockButton disabled subtitle="(coming soon)">
          PayPal
        </StyledBlockButton>
      </ModalAction>
    </ModalFrame>
  );
}
