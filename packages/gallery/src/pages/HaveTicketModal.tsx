import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import auth0 = require("auth0-js");

import { format } from "lib/exhibitionSlug";
import EmailInput from "components/EmailInput";
import EnterButton from "components/EnterButton";
import EntityToken from "context/EntityToken";
import ModalFrame from "components/ModalFrame";
import ModalHeader from "components/ModalHeader";
import ModalSubtitle from "components/ModalSubtitle";
import ModalTitle from "components/ModalTitle";
import useCurrentExhibition from "hook/useCurrentExhibition";
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
  const [token, , hydratedToken] = EntityToken.useContainer();
  const isLoggedIn = hydratedToken && !!token;
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
    const webAuth = new auth0.WebAuth({
      domain: "bydot.auth0.com",
      clientID: "fNGKI8h4vmuJRIPOC247QJHL7aJb6DPN",
      redirectUri: `http://localhost:3000/login?${new URLSearchParams({
        goto: format(exhibition.number, show.number),
      })}`,
    });

    webAuth.passwordlessStart(
      {
        connection: "email",
        email: emailInput.current.value,
        send: "link",
        authParams: {
          responseType: "token",
          scope: "openid email",
        },
      },
      (err, res) => {
        setIsRequestingLogin(false);
        setDidRequestLogin(true);
      },
    );
  }, [exhibition.number, show.number]);

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
