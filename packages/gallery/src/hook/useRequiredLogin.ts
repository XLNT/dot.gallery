import { useEffect } from "react";
import EntityToken from "context/EntityToken";
import useRouter from "context/useRouter";

export default function useRequiredLogin() {
  const { history } = useRouter();
  const [entityToken, , entityTokenHydrated] = EntityToken.useContainer();
  useEffect(() => {
    if (entityTokenHydrated && !entityToken) {
      console.log("useRequiredLogin: user is not logged in");
      history.replace("/");
    }
  }, [entityToken, entityTokenHydrated, history]);
}
