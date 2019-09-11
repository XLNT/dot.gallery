import { get } from "lodash-es";
import { useEffect } from "react";

import { useCurrentEntityQuery } from "operations";
import useRouter from "context/useRouter";

export default function useRequiredTicket() {
  const { history } = useRouter();
  const { data, loading, error } = useCurrentEntityQuery();
  const ticket = get(data, ["currentEntity", "availableTicket"]);

  useEffect(() => {
    if (
      !loading &&
      !error &&
      !ticket &&
      process.env.NODE_ENV !== "development"
    ) {
      console.log("useRequiredTicket: user does not have ticket");
      history.replace("/want-ticket");
    }
  }, [error, history, loading, ticket]);
}
