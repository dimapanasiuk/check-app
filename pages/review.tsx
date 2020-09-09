import React from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";

import {
  Form,
  Select,
  Input,
  InputNumber,
  Button,
  Checkbox,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import uniqid from "uniqid";

const { TextArea } = Input;
const { Option } = Select;

interface ITaskData {
  id: string;
  taskName: string;
  taskDescription: string;
  maxScore: number;
  markdown: string;
  date: Array<string>;
}

interface IGetInitialProps {
  tasks: Array<ITaskData>;
}

const Review: NextPage<IGetInitialProps> = ({ tasks }: IGetInitialProps) => {
  const tasksNames = tasks.map((i) => (
    <Option value={i.taskName} key={uniqid()}>
      {i.taskName}
    </Option>
  ));

  const handleChange = (e) => {
    console.log(`handleChange ${e}`);
  };

  const changeInputNumberHandler = (e) => {
    console.log("changeInputNumberHandler", e);
  };

  const changeTextAreaHandler = (e) => {
    console.log("changeTextAreaHandler", e);
  };

  const onCheck = (e) => {
    console.log("onCheck", e);
  };

  const submitFormHandler = (e) => {
    console.log("submitFormHandler", e);
  };

  return (
    <MainLayout title="review page">
      <Form name="basic" layout="vertical" onFinish={submitFormHandler}>
        <Form.Item
          label="Login"
          name="login"
          rules={[
            {
              required: true,
              message: "Please choose your task!",
            },
          ]}
        >
          <Select defaultValue="please check task" onChange={handleChange}>
            {tasksNames}
          </Select>
        </Form.Item>
        <Form.Item
          label="Student"
          name="student"
          rules={[
            {
              required: true,
              message: "Please enter student!",
            },
          ]}
        >
          <Input
            value=""
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Github login"
          />
        </Form.Item>

        <Form.Item label="Student" name="student">
          <Checkbox onClick={onCheck} name="check-box">
            check me
          </Checkbox>
        </Form.Item>

        <Form.Item label="Student" name="student">
          <InputNumber min={1} max={500} onChange={changeInputNumberHandler} />
        </Form.Item>
        <Form.Item name="Comment" label="comment">
          <TextArea
            onChange={changeTextAreaHandler}
            autoSize={true}
            style={{ minHeight: "70px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

Review.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const json = await res.json();

  return { tasks: json };
};

export default Review;
