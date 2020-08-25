import React from "react";

import "antd/dist/antd.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

const MyApp: React.FC = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
};

export default MyApp;
