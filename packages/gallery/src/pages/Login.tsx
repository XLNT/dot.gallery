import { useLoginAsMutation } from "operations";
import React, { useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import EntityToken from "context/EntityToken";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useRouter from "context/useRouter";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export default function Login() {
  useSuggestedPanelState(false);
  useEnforcePanelVisibility(false);
  const { history, location } = useRouter();

  const [, setEntityToken] = EntityToken.useContainer();
  const [loginAs] = useLoginAsMutation();

  const searchParams = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(location.hash.replace(/^#/, ""));
  const goto = `/${searchParams.get("goto") || ""}`;
  const accessToken = hashParams.get("access_token");

  useEffect(() => {
    if (accessToken) {
      // submit to backend
      loginAs({ variables: { accessToken } }).then(
        ({ data: { loginAs: entityToken } }) => {
          // set in local storage
          setEntityToken(entityToken);

          // forward to page
          setTimeout(() => history.push(goto), 200);
        },
      );
    }
  }, [accessToken, goto, history, loginAs, setEntityToken]);

  return (
    <Container>
      {accessToken ? (
        <Loading>Logging you in...</Loading>
      ) : (
        <Loading>
          The login link done broke... <Link to="/">try logging in again</Link>?
        </Loading>
      )}
    </Container>
  );
}
