import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANCHES_IN_REPO } from "./graphs/branches";
import { REPOS } from "./graphs/repositories";

import { IRepository } from "./interfaces/repositoriesInterface";
import { IBranch } from "./interfaces/branchesInterface";

import { LoadingComponent, ErrorComponent, BranchAndRepoSelect } from "./index"
import { Typography } from "antd";


const { Title } = Typography;

interface IChooser {
  title: string;
  login: string;
  selectedRepo: string | null;
  selectedBranch: string | null;
  onHandleRepoSelect: (value: string) => void;
  onHandleBranchSelect: (value: string) => void;
  setFailed: () => void;
}

const BrunchAndReposContainer: React.FC<IChooser> = React.memo(
  ({
    title,
    login,
    selectedBranch,
    selectedRepo,
    onHandleBranchSelect,
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

    const branchesData: IBranch[] = branches.data.repository.refs.edges;

    return (
      <>
        <Title style={{ marginTop: "20px" }} level={2}>
          {title}
        </Title>
        <BranchAndRepoSelect
          onHandleRepoSelect={onHandleRepoSelect}
          arrayData={reposData}
          isRepo={true}
          selectedRepo={selectedRepo}
        />
        {selectedRepo && (
          <BranchAndRepoSelect
            arrayData={branchesData}
            isRepo={false}
            onHandleBranchSelect={onHandleBranchSelect}
            selectedBranch={selectedBranch}
          />
        )}
      </>
    );
  }
);

export default BrunchAndReposContainer;
