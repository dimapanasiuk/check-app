import React from "react";
import { Form, Input, InputNumber } from "antd";

interface IInitialTask {
  getDataFoo: (data: string) => void;
  getDataFromInputNumber: (data: number) => void;
}

const InitialTask: React.FC<IInitialTask> = ({
  getDataFoo,
  getDataFromInputNumber,
}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDataFoo(e.target.value);
  };

  const onInputNumberChange = (value) => {
    getDataFromInputNumber(value);
  };

  return (
    <Form name="basic">
      <Form.Item
        name={"name"}
        label="Task Name"
        rules={[
          {
            required: true,
            message: "Please input task name!",
          },
        ]}
      >
        <Input onChange={changeHandler} />
      </Form.Item>
      <Form.Item
        name={"score"}
        label="Maximum score"
        rules={[
          {
            required: true,
            message: "Please input score!",
          },
        ]}
      >
        <InputNumber min={1} max={500} onChange={onInputNumberChange} />
      </Form.Item>
    </Form>
  );
};

export default InitialTask;
