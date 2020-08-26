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

const getAllBranches = gql`
  {
    search(query: "org:dimapanasiuk", type: REPOSITORY, last: 100) {
      nodes {
        ... on Repository {
          nameWithOwner
          refs(first: 100, refPrefix: "refs/heads/") {
            nodes {
              name
              target {
                ... on Commit {
                  oid
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getAllCommitsOnBranch = gql`
  {
    repository(name: "todoTs", owner: "dimapanasiuk") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(first: 5) {
              pageInfo {
                hasNextPage
              }
              edges {
                node {
                  messageHeadline
                  oid
                  message
                  author {
                    name
                    email
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getAllReopositories = gql`
  {
    repository(name: "songbird", owner: "dimapanasiuk") {
      pullRequests(last: 25) {
        nodes {
          id
          title
          createdAt
        }
      }
    }
  }
`;

interface IChooser {
  title: string;
}

const Chooser: React.FC<IChooser> = ({ title }: IChooser) => {
  const { loading, error, data } = useQuery(REPOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const repos = data.repositoryOwner.repositories.nodes;

  return (
    <>
      <Title level={2}>{title}</Title>
      <CabinetInput repos={repos} />
    </>
  );
};

export default Chooser;
