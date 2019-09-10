import { useEffect } from "react";
import ReactGA from "react-ga";
import useRouter from "context/useRouter";

export default function usePageview() {
  const { location } = useRouter();

  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location.pathname]);
}
