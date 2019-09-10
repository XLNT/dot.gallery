import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { requestLogin } from "client/auth0";
import EmailInput from "components/EmailInput";
import ModalFrame from "components/ModalFrame";
import ModalHeader from "components/ModalHeader";
import ModalSubtitle from "components/ModalSubtitle";
import ModalTitle from "components/ModalTitle";
import useIsLoggedIn from "hook/useIsLoggedIn";
import useRouter from "context/useRouter";

const ModalAction = styled.div`
  margin-top: 3rem;
  justify-self: flex-end;
`;

export default function LoginModal() {
  const { history, location } = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const emailInput = useRef<HTMLInputElement>();

  const [isRequestingLogin, setIsRequestingLogin] = useState<boolean>(false);
  const [didRequestLogin, setDidRequestLogin] = useState<boolean>(false);

  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ]);
  const goto = params.get("goto") || "/";
  const title = params.get("title") || "Login";
  const subtitle = params.get("subtitle") || "Enter your email to log in.";

  useEffect(() => {
    if (isLoggedIn) {
      history.replace(goto);
    }
  }, [goto, history, isLoggedIn]);

  const onSubmit = useCallback(async () => {
    setIsRequestingLogin(true);
    try {
      await requestLogin(emailInput.current.value, goto);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequestingLogin(false);
      setDidRequestLogin(true);
    }
  }, [goto]);

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <ModalSubtitle>
          {didRequestLogin ? "Check your email for a login link." : subtitle}
        </ModalSubtitle>
      </ModalHeader>
      <ModalAction>
        {didRequestLogin ? (
          <ModalSubtitle>
            Login link sent to your email. You may close this page.
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
