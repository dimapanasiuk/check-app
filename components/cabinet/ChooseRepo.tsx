import React from "react";
import { useQuery, gql } from "@apollo/client";

import CabinetInput from "./CabinetInput";

import { Typography } from "antd";

const { Title } = Typography;

const REPOS = gql`
  {
    repositoryOwner(login: "GordeySt") {
      login
      repositories(first: 100, orderBy: { field: NAME, direction: ASC }) {
        nodes {
          name
          isPrivate
          owner {
            login
          }
          defaultBranchRef {
            name
          }
        }
      }
    }
  }
`;

const GET_ALL_BRANCHES_IN_REPO = gql`
  {
    repository(owner: "dimapanasiuk", name: "todoTs") {
      refs(
        refPrefix: "refs/heads/"
        orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
        first: 100
      ) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

interface IChooser {
  title: string;
}

const Chooser: React.FC<IChooser> = ({ title }: IChooser) => {
  const repos = useQuery(REPOS);
  const branches = useQuery(GET_ALL_BRANCHES_IN_REPO);

  if (repos.loading) return <p>Loading...</p>;
  if (repos.error) return <p>Error :(</p>;
  if (branches.loading) return <p>Loading...</p>;
  if (branches.error) return <p>Error :(</p>;

  const branchesData = branches.data.repository.refs.edges;
  const reposData = repos.data.repositoryOwner.repositories.nodes;

  return (
    <>
      <Title level={2}>{title}</Title>
      <CabinetInput arr={reposData} />
      <CabinetInput arr={branchesData} />
    </>
  );
};

export default Chooser;
