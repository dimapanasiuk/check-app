import React from "react";
import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { GET_ALL_PR } from "./graphs/pullRequests";

import { Select } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

interface IChoosePR {
  title: string;
  login: string;
  selectedRepo: string | null;
  selectedPR: string | null;
  onHandlePRSelect: (value: string) => void;
}

const PullRequests: React.FC<IChoosePR> = ({
  title,
  login,
  selectedRepo,
  selectedPR,
  onHandlePRSelect,
}: IChoosePR) => {
  const pr = useQuery(GET_ALL_PR, {
    variables: {
      repo_name: selectedRepo,
      login,
    },
  });

  if (pr.loading) return <p>Loading...</p>;
  if (pr.error) return <p>Error :(</p>;

  const PR = pr.data.repository.pullRequests.nodes;

  return (
    <>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      {PR.length === 0 ? (
        <h1 style={{ margin: "20px 0 20px" }}>No Pull Requests</h1>
      ) : (
        <Select
          value={selectedPR}
          showSearch
          style={{ width: 200 }}
          onChange={onHandlePRSelect}
          placeholder={"Select pull request"}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {PR.map((item) => (
            <Option key={uuidv4()} value={item.title}>
              {item.title}
            </Option>
          ))}
        </Select>
      )}
    </>
  );
};
export default PullRequests;
