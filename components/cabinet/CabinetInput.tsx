import React from "react";
import { uniqid } from "uniqid";

import { Select } from "antd";

const { Option } = Select;

interface ICustomInput {
  arr: any;
}

const CabinetInput: React.FC<ICustomInput> = ({ arr }: ICustomInput) => {
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
        {arr.map((i) => (
          <Option key={uniqid()} value={i.name}>
            {i.name || i.node.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default CabinetInput;
