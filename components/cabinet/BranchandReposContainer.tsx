import React from "react";

import { IRepository } from "./interfaces/repositoriesInterface";

import { Branches, Repositories } from "./index";

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

const BranchAndReposContainer: React.FC<IChooser> = ({
  title,
  login,
  selectedBranch,
  selectedRepo,
  onHandleBranchSelect,
  onHandleRepoSelect,
  setFailed,
}: IChooser) => {
  const [repositories, setRepositories] = React.useState<IRepository[] | null>(
    null
  );

  const onLoadRepositories = (value: IRepository[]): void => {
    setRepositories(value);
  };

  return (
    <React.Fragment>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      <Repositories
        login={login}
        repositories={repositories}
        onLoadRepositories={onLoadRepositories}
        selectedRepo={selectedRepo}
        onHandleRepoSelect={onHandleRepoSelect}
        setFailed={setFailed}
      />
      {selectedRepo && (
        <Branches
          login={login}
          repositories={repositories}
          selectedRepo={selectedRepo}
          selectedBranch={selectedBranch}
          onHandleBranchSelect={onHandleBranchSelect}
          setFailed={setFailed}
        />
      )}
      )
    </React.Fragment>
  );
};

export default BranchAndReposContainer;
