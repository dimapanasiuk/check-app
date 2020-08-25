import React from "react";
import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query {
    viewer {
      login
    }
  }
`;
const Test = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("data", data.viewer.login);

  return <h1>{data.viewer.login}</h1>;
};

export default Test;
