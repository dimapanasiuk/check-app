import React from "react";
import { uuid } from "uuidv4";

import { Select } from "antd";

const { Option } = Select;

interface ICustomInput {
  repos: any;
}

const CabinetInput: React.FC<ICustomInput> = ({
  repos,
}: ICustomInput) => {
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

  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
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

export default CabinetInput;
