import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANCHES_IN_REPO } from "./graphs/brunches";
import { REPOS } from "./graphs/repositories";

import { IRepository } from "./interfaces/repositoriesInterface";
import { IBrunch } from "./interfaces/brunchesInterface";

import BrunchAndRepoSelect from "./BrunchAndRepoSelect";

import { Typography } from "antd";

const { Title } = Typography;

interface IChooser {
  title: string;
  login: string;
  selectedRepo: string | null;
  selectedBrunch: string | null;
  onHandleRepoSelect: (value: string) => void;
  onHandleBrunchSelect: (value: string) => void;
}

const BrunchAndRepoContainer: React.FC<IChooser> = React.memo(
  ({
    title,
    login,
    selectedBrunch,
    selectedRepo,
    onHandleBrunchSelect,
    onHandleRepoSelect,
  }: IChooser) => {
    const repos = useQuery(REPOS, {
      variables: {
        login,
      },
    });

    const branches = useQuery(GET_ALL_BRANCHES_IN_REPO, {
      variables: {
        repo_name: selectedRepo || "songbird",
        login,
      },
    });

    if (repos.loading) return <p>Loading...</p>;
    if (repos.error) return <p>Error :(</p>;
    if (branches.loading) return <p>Loading...</p>;
    if (branches.error) return <p>Error :(</p>;

    const branchesData: IBrunch[] = branches.data.repository.refs.edges;
    const reposData: IRepository[] =
      repos.data && repos.data.repositoryOwner.repositories.nodes;

    return (
      <>
        <Title style={{ marginTop: "20px" }} level={2}>
          {title}
        </Title>
        <BrunchAndRepoSelect
          onHandleRepoSelect={onHandleRepoSelect}
          arr={reposData}
          isRepo={true}
          selectedRepo={selectedRepo}
        />
        {selectedRepo && (
          <BrunchAndRepoSelect
            arr={branchesData}
            isRepo={false}
            onHandleBrunchSelect={onHandleBrunchSelect}
            selectedBrunch={selectedBrunch}
          />
        )}
      </>
    );
  }
);

export default BrunchAndRepoContainer;
