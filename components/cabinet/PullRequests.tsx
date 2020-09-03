import React from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_PR } from "./graphs/pullRequests";

import { Typography } from "antd";

const { Title } = Typography;

interface IChoosePR {
  title: string;
  login: string;
  selectedRepo: string | null;
}

const PullRequests: React.FC<IChoosePR> = ({
  title,
  login,
  selectedRepo,
}: IChoosePR) => {
  const pr = useQuery(GET_ALL_PR, {
    variables: {
      repo_name: selectedRepo,
      login,
    },
  });

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
export default PullRequests;
