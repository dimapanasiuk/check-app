import React from "react";
import { useQuery } from "@apollo/client";
import { REPOS, GET_ALL_BRANCHES_IN_REPO } from "./graphs";

import CabinetInput from "./CabinetInput";
import { IRepository } from "./interfaces/repositoriesInterface";
import { IBrunch } from "./interfaces/brunchesInterface"
import { Typography } from "antd";

const { Title } = Typography;

interface IChooser {
  title: string;
}

const Chooser: React.FC<IChooser> = ({ title }: IChooser) => {
  const [selectValue, setSelectValue] = React.useState<string>("");
  const repos = useQuery(REPOS);
  const branches = useQuery(GET_ALL_BRANCHES_IN_REPO, {
    variables: {
      repo_name: selectValue || "check-app",
    },
  });

  if (repos.loading) return <p>Loading...</p>;
  if (repos.error) return <p>Error :(</p>;
  if (branches.loading) return <p>Loading...</p>;
  if (branches.error) return <p>Error :(</p>;

  const branchesData: IBrunch[] = branches.data.repository.refs.edges;
  const reposData: IRepository[] =
    repos.data.repositoryOwner.repositories.nodes;


  return (
    <>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      <CabinetInput arr={reposData} />
      <CabinetInput arr={branchesData} />
    </>
  );
};

export default Chooser;
