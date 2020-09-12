import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANCHES_IN_REPO } from "./graphs/branches";

import { IBranch } from "./interfaces/branchesInterface";

import { LoadingComponent, ErrorComponent, BranchAndRepoSelect } from "./index";
import { IRepository } from "./interfaces/repositoriesInterface";

interface IBranches {
  login: string;
  selectedBranch: string | null;
  onHandleBranchSelect: (value: string) => void;
  setFailed: () => void;
  selectedRepo: string;
  repositories: IRepository[];
}

const Branches: React.FC<IBranches> = React.memo(
  ({
    login,
    selectedBranch,
    onHandleBranchSelect,
    setFailed,
    selectedRepo,
    repositories,
  }: IBranches) => {
    const branches = useQuery(GET_ALL_BRANCHES_IN_REPO, {
      variables: {
        repo_name: selectedRepo || (repositories && repositories[0].name),
        login,
      },
    });

    if (branches.loading) return <LoadingComponent />;
    if (branches.error) {
      setFailed();
      return <ErrorComponent />;
    }

    const branchesData: IBranch[] = branches.data.repository.refs.edges;

    return (
      <>
        <BranchAndRepoSelect
          arrayData={branchesData}
          isRepo={false}
          onHandleBranchSelect={onHandleBranchSelect}
          selectedBranch={selectedBranch}
        />
      </>
    );
  }
);

export default Branches;
