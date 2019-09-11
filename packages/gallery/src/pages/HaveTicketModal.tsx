import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { format } from "lib/exhibitionSlug";
import { requestLogin } from "client/auth0";
import EmailInput from "components/EmailInput";
import EnterButton from "components/EnterButton";
import ModalFrame from "components/ModalFrame";
import ModalHeader from "components/ModalHeader";
import ModalSubtitle from "components/ModalSubtitle";
import ModalTitle from "components/ModalTitle";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useIsLoggedIn from "hook/useIsLoggedIn";
import useIsOpen from "hook/useIsOpen";
import useRouter from "context/useRouter";

const ModalAction = styled.div`
  margin-top: 3rem;
  justify-self: flex-end;
`;

const StyledEnterButton = styled(EnterButton)`
  font-size: 3rem;
`;

export default function HaveTicketModal() {
  const { history } = useRouter();
  const { isDefinitelyOpen, isDefinitelyClosed } = useIsOpen();
  const isLoggedIn = useIsLoggedIn();
  const emailInput = useRef<HTMLInputElement>();

  const [isRequestingLogin, setIsRequestingLogin] = useState<boolean>(false);
  const [didRequestLogin, setDidRequestLogin] = useState<boolean>(false);

  const { exhibition, show } = useCurrentExhibition();

  const goExhibition = useCallback(
    () => history.push(`/${format(exhibition.number, show.number)}`),
    [exhibition, history, show],
  );

  const onSubmit = useCallback(async () => {
    setIsRequestingLogin(true);
    try {
      // if open show, redirect to exhibition, otherwise go home
      const goto = isDefinitelyOpen
        ? `/${format(exhibition.number, show.number)}`
        : "/";
      await requestLogin(emailInput.current.value, goto);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequestingLogin(false);
      setDidRequestLogin(true);
    }
  }, [exhibition, isDefinitelyOpen, show]);

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>
          {isDefinitelyClosed ? "dot.gallery is closed" : "I have a ticket."}
        </ModalTitle>
        <ModalSubtitle>
          {isDefinitelyClosed
            ? "You already have a ticket for this exhibition. Return here for the next showing."
            : isLoggedIn
            ? "You may enter the exhibition. The exhibition, experienced gradually, occupies an hour and a half."
            : didRequestLogin
            ? "Check your email for a link to the exhibition."
            : "Enter your email to receive a link to the exhibition."}
        </ModalSubtitle>
      </ModalHeader>
      <ModalAction>
        {isDefinitelyClosed ? null : isLoggedIn ? (
          <StyledEnterButton onClick={goExhibition}>Enter</StyledEnterButton>
        ) : didRequestLogin ? (
          <ModalSubtitle>
            Exhibition link sent to your email. You may close this page.
          </ModalSubtitle>
        ) : isRequestingLogin ? (
          <ModalSubtitle>Sending login email...</ModalSubtitle>
        ) : (
          <EmailInput ref={emailInput} onSubmit={onSubmit} />
        )}
      </ModalAction>
    </ModalFrame>
  );
}
