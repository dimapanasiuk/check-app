import React from "react";
import { v4 as uuidv4 } from "uuid";

import { IRepository } from "./interfaces/repositoriesInterface";
import { IBrunch } from "./interfaces/brunchesInterface";

import { Select } from "antd";
import { DesktopOutlined, BranchesOutlined } from "@ant-design/icons";

const { Option } = Select;

interface ICustomInput {
  arr: IRepository[] | IBrunch[];
  isRepo: boolean;
  onHandleRepoSelect?: (value: string) => void;
  onHandleBrunchSelect?: (value: string) => void;
  selectedRepo?: string;
  selectedBrunch?: string;
}

const BrunchAndRepoSelect: React.FC<ICustomInput> = ({
  arr,
  isRepo,
  onHandleRepoSelect,
  onHandleBrunchSelect,
  selectedRepo,
  selectedBrunch,
}: ICustomInput) => {
  const onHandleRepoChange = (value: string) => {
    onHandleRepoSelect(value);
  };

  const onHandleBrunchChange = (value: string) => {
    onHandleBrunchSelect(value);
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
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {(arr as Array<IRepository>).map((i) => (
            <Option key={uuidv4()} value={i.name}>
              <DesktopOutlined /> {i.name}
            </Option>
          ))}
        </Select>
      ) : (
        <Select
          value={selectedBrunch}
          showSearch
          style={{ width: 200, marginRight: "20px" }}
          onChange={onHandleBrunchChange}
          placeholder={"Select brunch"}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {(arr as Array<IBrunch>).map((i) => (
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
