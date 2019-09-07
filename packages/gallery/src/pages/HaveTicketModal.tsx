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
import useRouter from "context/useRouter";

const ModalAction = styled.div`
  margin-top: 3rem;
  justify-self: flex-end;
`;

const StyledEnterButton = styled(EnterButton)`
  font-size: 4rem;
`;

export default function HaveTicketModal() {
  const { history } = useRouter();
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

    await requestLogin(
      emailInput.current.value,
      format(exhibition.number, show.number),
    );

    setIsRequestingLogin(false);
    setDidRequestLogin(true);
  }, [exhibition, show]);

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>I have a ticket.</ModalTitle>
        <ModalSubtitle>
          {isLoggedIn
            ? "Redeem your ticket to enter the exhibition."
            : didRequestLogin
            ? "Check your email for a link to the exhibition."
            : "Enter your email to receive a link to the exhibition."}
        </ModalSubtitle>
      </ModalHeader>
      <ModalAction>
        {isLoggedIn ? (
          <StyledEnterButton onClick={goExhibition}>Redeem</StyledEnterButton>
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
