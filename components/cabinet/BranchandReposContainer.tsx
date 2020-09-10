import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANCHES_IN_REPO } from "./graphs/brunches";
import { REPOS } from "./graphs/repositories";

import { IRepository } from "./interfaces/repositoriesInterface";
import { IBrunch } from "./interfaces/brunchesInterface";

import BrunchAndRepoSelect from "./BrunchAndRepoSelect";

import { Typography } from "antd";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

const { Title } = Typography;

interface IChooser {
  title: string;
  login: string;
  selectedRepo: string | null;
  selectedBrunch: string | null;
  onHandleRepoSelect: (value: string) => void;
  onHandleBrunchSelect: (value: string) => void;
  setFailed: () => void;
}

const BrunchAndRepoContainer: React.FC<IChooser> = React.memo(
  ({
    title,
    login,
    selectedBrunch,
    selectedRepo,
    onHandleBrunchSelect,
    onHandleRepoSelect,
    setFailed,
  }: IChooser) => {
    const repos = useQuery(REPOS, {
      variables: {
        login,
      },
    });

    const reposData: IRepository[] =
      repos.data && repos.data.repositoryOwner.repositories.nodes;

    const branches = useQuery(GET_ALL_BRANCHES_IN_REPO, {
      variables: {
        repo_name: selectedRepo || (reposData && reposData[0].name),
        login,
      },
    });

    if (repos.loading) return <LoadingComponent />;
    if (repos.error) {
      setFailed();
      return <ErrorComponent />;
    }

    if (branches.loading) return <LoadingComponent />;
    if (branches.error) {
      setFailed();
      return <ErrorComponent />;
    }

    const branchesData: IBrunch[] = branches.data.repository.refs.edges;

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
