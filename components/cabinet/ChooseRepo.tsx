import React from "react";
import { uuid } from "uuidv4";

import { Typography, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

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
        {arr.map((i) => (
          <Option key={uuid()} value={i.name}>
            {i.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default Chooser;
