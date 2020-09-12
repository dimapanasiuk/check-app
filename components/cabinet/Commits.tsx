import React from "react";
import { Timeline } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMITS_IN_BRANCH } from "./graphs/commits";
import { LoadingComponent, ErrorComponent } from "./index";

interface ICheckCommit {
  title: string;
  selectedBranch: string | null;
  selectedRepo: string | null;
  login: string;
}

const Commits: React.FC<ICheckCommit> = ({
  title,
  selectedRepo,
  selectedBranch,
  login,
}: ICheckCommit) => {
  const commits = useQuery(GET_ALL_COMMITS_IN_BRANCH, {
    variables: {
      repo_name: selectedRepo,
      branch: selectedBranch,
      login,
    },
  });
  if (commits.loading) return <LoadingComponent />;
  if (commits.error)
    return <ErrorComponent />;

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
