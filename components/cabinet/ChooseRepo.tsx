import React from "react";
import { useQuery } from "@apollo/client";
import { REPOS, GET_ALL_BRANCHES_IN_REPO } from "./graphs";

import CabinetInput from "./CabinetInput";
import { IRepository } from "./interfaces/repositoriesInterface";
import { IBrunch } from "./interfaces/brunchesInterface";
import { Typography } from "antd";

const { Title } = Typography;

interface IChooser {
  title: string;
  login: string;
}

const Chooser: React.FC<IChooser> = React.memo(({ title, login }: IChooser) => {
  const [selectedRepo, setSelectedRepo] = React.useState<string | null>(null);
  const [selectedBrunch, setSelectedBrunch] = React.useState<string | null>(
    null
  );
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

  const onHandleRepoSelect = (value?: string): void => {
    setSelectedBrunch(null);
    setSelectedRepo(value);
  };
  const onHandleBrunchSelect = (value: string): void => {
    setSelectedBrunch(value);
  };

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
      <CabinetInput
        onHandleRepoSelect={onHandleRepoSelect}
        arr={reposData}
        isRepo={true}
        selectedRepo={selectedRepo}
      />
      {selectedRepo && (
        <CabinetInput
          arr={branchesData}
          isRepo={false}
          onHandleBrunchSelect={onHandleBrunchSelect}
          selectedBrunch={selectedBrunch}
        />
      )}
    </>
  );
});

export default Chooser;
