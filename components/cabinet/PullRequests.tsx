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
  console.log(PR);

  return (
    <>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      {PR.length === 0 ? (
        <h2 style={{ margin: "20px 0 20px" }}>No Pull Requests</h2>
      ) : (
        PR.map((item, i) => (
          <h1 style={{ margin: "20px 0 20px" }} key={i}>
            {item.title}
          </h1>
        ))
      )}
    </>
  );
};
export default PullRequests;
