import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_REPOS } from "./graphs/repositories";

import { IRepository } from "./interfaces/repositoriesInterface";

import { LoadingComponent, ErrorComponent, BranchAndRepoSelect } from "./index";

interface IRepositories {
  login: string;
  selectedRepo: string | null;
  onHandleRepoSelect: (value: string) => void;
  setFailed: () => void;
  onLoadRepositories: (value: IRepository[]) => void;
  repositories: IRepository[];
}

const Repositories: React.FC<IRepositories> = React.memo(
  ({
    login,
    selectedRepo,
    onHandleRepoSelect,
    setFailed,
    onLoadRepositories,
    repositories,
  }: IRepositories) => {
    const { loading, error, data } = useQuery(GET_ALL_REPOS, {
      variables: {
        login,
      },
    });

    React.useEffect(() => {
      data && onLoadRepositories(data.repositoryOwner.repositories.nodes);
    });

    if (loading) return <LoadingComponent />;
    if (error) {
      setFailed();
      return <ErrorComponent />;
    }

    return (
      <>
        {repositories && (
          <BranchAndRepoSelect
            onHandleRepoSelect={onHandleRepoSelect}
            arrayData={repositories && repositories}
            isRepo={true}
            selectedRepo={selectedRepo}
          />
        )}
      </>
    );
  }
);

export default Repositories;
