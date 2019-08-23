import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const BASE_URL = "gallery-v1-f5f0a401ff.herokuapp.com";

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
      split(
        ({ query }) => {
          console.log(query);
          const definition = getMainDefinition(query);
          console.log(definition);
          return (
            definition.kind === "OperationDefinition" && definition.operation === "subscription"
          );
        },
        new WebSocketLink({
          uri: `wss://${BASE_URL}`,
          options: {
            reconnect: true,
          },
        }),
        new HttpLink({
          uri: `https://${BASE_URL}`,
        }),
      ),
    ]),
    cache: new InMemoryCache(),
  });
