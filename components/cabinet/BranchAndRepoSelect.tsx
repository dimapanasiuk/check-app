import React from "react";
import { v4 as uuidv4 } from "uuid";

import { IRepository } from "./interfaces/repositoriesInterface";
import { IBranch } from "./interfaces/branchesInterface";

import { Select } from "antd";
import { DesktopOutlined, BranchesOutlined } from "@ant-design/icons";

const { Option } = Select;

interface ICustomInput {
  arrayData: IRepository[] | IBranch[];
  isRepo: boolean;
  onHandleRepoSelect?: (value: string) => void;
  onHandleBranchSelect?: (value: string) => void;
  selectedRepo?: string;
  selectedBranch?: string;
}

const BrunchAndRepoSelect: React.FC<ICustomInput> = ({
  arrayData,
  isRepo,
  onHandleRepoSelect,
  onHandleBranchSelect,
  selectedRepo,
  selectedBranch,
}: ICustomInput) => {
  const onHandleRepoChange = (value: string) => {
    onHandleRepoSelect(value);
  };
  const onHandleBrunchChange = (value: string) => {
    onHandleBranchSelect(value);
  };

  return (
    <>
      {isRepo ? (
        <Select
          value={selectedRepo}
          showSearch
          style={{ width: 200, marginRight: "20px" }}
          onChange={onHandleRepoChange}
          placeholder={"Select repository"}
        >
          {(arrayData as Array<IRepository>).map((i) => (
            <Option key={uuidv4()} value={i.name}>
              <DesktopOutlined /> {i.name}
            </Option>
          ))}
        </Select>
      ) : (
        <Select
          value={selectedBranch}
          showSearch
          style={{ width: 200, marginRight: "20px" }}
          onChange={onHandleBrunchChange}
          placeholder={"Select brunch"}
        >
          {(arrayData as Array<IBranch>).map((i) => (
            <Option key={uuidv4()} value={i.node.name}>
              <BranchesOutlined /> {i.node.name}
            </Option>
          ))}
        </Select>
      )}
    </>
  );
};

export default BrunchAndRepoSelect;
