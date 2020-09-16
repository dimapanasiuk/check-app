import React from "react";
import { DatePicker, Form, Input, InputNumber } from "antd";

const { RangePicker } = DatePicker;

interface IInitialTask {
  getDataFromInput: (data: string) => void;
  getDataFromInputNumber: (data: number) => void;
  getDataFromTextArea: (data: string) => void;
  getDataAboutDate: (data: Array<string>) => void;
  taskName: string;
  inputNumberValue: number;
  taskDescription: string;
}

const { TextArea } = Input;

const InitialTask: React.FC<IInitialTask> = ({
  getDataFromInput,
  getDataFromInputNumber,
  getDataFromTextArea,
  getDataAboutDate,
  taskName,
  inputNumberValue,
  taskDescription,
}: IInitialTask) => {
  const onChange = (value, dateString) => {
    getDataAboutDate(dateString);
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDataFromInput(e.target.value);
  };

  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    getDataFromTextArea(e.target.value);
  };

  const changeInputNumberHandler = (value) => {
    getDataFromInputNumber(value);
  };

  return (
    <Form name="basic" layout="vertical">
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
          style={{ minHeight: "100px" }}
        />
      </Form.Item>

      <Form.Item
        name={"date"}
        label="Enter date for start and deadline task"
        initialValue={inputNumberValue}
        rules={[
          {
            required: true,
            message: "Please enter date",
          },
        ]}
      >
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
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
