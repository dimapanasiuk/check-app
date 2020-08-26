import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Typography } from "antd";

const { Title } = Typography;

const GET_ALL_PR = gql`
  {
    repository(name: "songbird", owner: "dimapanasiuk") {
      pullRequests(last: 25) {
        nodes {
          id
          title
          createdAt
        }
      }
    }
  }
`;

interface IChoosePR {
  title: string;
}

const ChoosePR: React.FC<IChoosePR> = ({ title }: IChoosePR) => {
  const pr = useQuery(GET_ALL_PR);

  if (pr.loading) return <p>Loading...</p>;
  if (pr.error) return <p>Error :(</p>;

  const PR = pr.data.repository.pullRequests.nodes;

  return (
    <>
      <Title level={2}>{title}</Title>
      {PR.map((item, i) => (
        <h1 key={i}>{item.title}</h1>
      ))}
    </>
  );
};
export default ChoosePR;
