import React from "react";
import { uuid } from "uuidv4";

import { Typography, Select } from "antd";
import { useQuery, gql } from "@apollo/client";

const { Title } = Typography;
const { Option } = Select;

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
  arr: any;
  title: string;
}

const Chooser: React.FC<IChooser> = ({ arr, title }: IChooser) => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onBlur = () => {
    console.log("blur");
  };

  const onFocus = () => {
    console.log("focus");
  };

  const onSearch = (val: string) => {
    console.log("search:", val);
  };

  const { loading, error, data } = useQuery(REPOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const repos = data.repositoryOwner.repositories.nodes;

  return (
    <>
      <Title level={2}>{title}</Title>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {repos.map((i) => (
          <Option key={uuid()} value={i.name}>
            {i.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default Chooser;
