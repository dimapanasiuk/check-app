import React from "react";
import { Form, Input, InputNumber } from "antd";

interface IInitialTask {
  getDataFoo: (data: string) => void;
  getDataFromInputNumber: (data: number) => void;
  getDataFromTextArea: (data: string) => void;
  taskName: string;
  inputNumberValue: number;
  taskDescription: string;
}

const { TextArea } = Input;

const InitialTask: React.FC<IInitialTask> = ({
  getDataFoo,
  getDataFromInputNumber,
  getDataFromTextArea,
  taskName,
  inputNumberValue,
  taskDescription,
}) => {
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDataFoo(e.target.value);
  };

  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    getDataFromTextArea(e.target.value);
  };

  const changeInputNumberHandler = (value) => {
    getDataFromInputNumber(value);
  };

  return (
    <Form name="basic">
      <Form.Item
        name={"name"}
        label="Task Name"
        initialValue={taskName}
        rules={[
          {
            required: true,
            message: "Please input task name!",
          },
        ]}
      >
        <Input onChange={changeInputHandler} />
      </Form.Item>
      <Form.Item
        name={"description"}
        label="Task description"
        initialValue={taskDescription}
      >
        <TextArea
          onChange={changeTextAreaHandler}
          autoSize={true}
          style={{ minHeight: "200px" }}
        />
      </Form.Item>
      <Form.Item
        name={"score"}
        label="Maximum score"
        initialValue={inputNumberValue}
        rules={[
          {
            required: true,
            message: "Please input score!",
          },
        ]}
      >
        <InputNumber min={1} max={500} onChange={changeInputNumberHandler} />
      </Form.Item>
    </Form>
  );
};

export default InitialTask;
