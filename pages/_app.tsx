import React from "react";

import "antd/dist/antd.css";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `token db65fdbe8b6a01f6b0b3acc59bc45d465e314d22` || null
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  // onError: ({ networkError, graphQLErrors }) => {
  //   if (graphQLErrors) {
  //     console.warn("graphQLErrors", graphQLErrors);
  //   }
  //   if (networkError) {
  //     console.warn("networkError", networkError);
  //   }
  // },
});

const MyApp: any = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
};

export default MyApp;
