import EntityToken from "context/EntityToken";

export default function useIsLoggedIn() {
  const [token, , hydratedToken] = EntityToken.useContainer();
  return hydratedToken && !!token;
}
