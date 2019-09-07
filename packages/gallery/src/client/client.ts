import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import localforage from "localforage";

const URI = "/graphql";

export default () =>
  new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),

      setContext(async (request, previousContext) => {
        const token = await localforage.getItem("entityToken");
        if (token) {
          console.log("sending with token", token);
          return {
            headers: { Authorization: `Bearer ${token}` },
          };
        }

        return {};
      }),

      new HttpLink({
        uri: URI,
      }),
    ]),
    cache: new InMemoryCache(),
  });
