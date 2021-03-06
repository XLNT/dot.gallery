import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { format } from "lib/exhibitionSlug";
import { formatCents } from "lib/money";
import { useCreateSessionMutation } from "operations";
import BlockButton from "components/BlockButton";
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
  flex-wrap: wrap;
`;

const StyledBlockButton = styled(BlockButton)`
  height: 6rem;
  width: 6rem;
  font-size: 1rem;

  background-color: ${fromTheme("background")};

  margin-right: 1rem;
  margin-top: 1rem;
`;

export default function WantTicketModal() {
  const { history } = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [loading, setLoading] = useState<string>();
  const [createSession] = useCreateSessionMutation();

  const { exhibition } = useCurrentExhibition();

  const onCreditCard = useCallback(async () => {
    setLoading("card");
    const {
      data: { createSession: sessionId },
    } = await createSession();

    await stripe().redirectToCheckout({ sessionId });
    setLoading(undefined);
  }, [createSession]);

  const goCoupon = useCallback(async () => {
    if (isLoggedIn) {
      history.push("/want-ticket/voucher");
    } else {
      history.push(
        `/login?${new URLSearchParams({
          goto: "/want-ticket/voucher",
          title: "Voucher, but first, login.",
          subtitle:
            "Click the link we send you to log in and enter your voucher code.",
        })}`,
      );
    }
  }, [history, isLoggedIn]);

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>I want a ticket.</ModalTitle>
        <ModalSubtitle>
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
        <StyledBlockButton onClick={onCreditCard} loading={loading === "card"}>
          Credit Card
        </StyledBlockButton>
        <StyledBlockButton onClick={goCoupon}>Voucher</StyledBlockButton>
        <StyledBlockButton disabled subtitle="(coming soon)">
          Crypto
        </StyledBlockButton>
      </ModalAction>
    </ModalFrame>
  );
}
