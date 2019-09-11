import { useEffect } from "react";

import useBreakpoints from "./useBreakpoints";
import useRouter from "context/useRouter";

export default function useMobileRedirect(goto: string) {
  const isMobile = useBreakpoints([true, false, false]);
  const { history } = useRouter();

  useEffect(() => {
    if (isMobile) {
      history.replace(goto);
    }
  }, [goto, history, isMobile]);
}
