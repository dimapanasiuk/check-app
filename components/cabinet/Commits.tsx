import React from "react";
import { Timeline } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMITS_IN_BRANCH } from "./graphs/commits";

interface ICheckCommit {
  title: string;
  selectedBrunch: string | null;
  selectedRepo: string | null;
  login: string;
}

const Commits: React.FC<ICheckCommit> = ({
  title,
  selectedRepo,
  selectedBrunch,
  login,
}: ICheckCommit) => {
  const commits = useQuery(GET_ALL_COMMITS_IN_BRANCH, {
    variables: {
      repo_name: selectedRepo,
      brunch: selectedBrunch,
      login,
    },
  });

  if (commits.loading) return <p>Loading...</p>;
  if (commits.error) return <p>Error :(</p>;

  const commitsData = commits.data.repository.ref.target.history.edges;

  return (
    <>
      <h1 style={{ margin: "20px 0 20px " }}>{title}</h1>
      <Timeline>
        {commitsData.map((item, i) => (
          <Timeline.Item key={i}>{item.node.messageHeadline}</Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
export default Commits;
