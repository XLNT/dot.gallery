import { get } from "lodash";
import { useEffect } from "react";

import { useCurrentEntityQuery } from "operations";
import useRouter from "context/useRouter";

export default function useRequiredTicket() {
  const { history } = useRouter();
  const { data, loading, error } = useCurrentEntityQuery();
  const ticket = get(data, ["currentEntity", "availableTicket"]);

  useEffect(() => {
    if (!loading && !error && !ticket) {
      history.replace("/want-ticket");
    }
  }, [error, history, loading, ticket]);
}
