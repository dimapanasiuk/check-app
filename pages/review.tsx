import React from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";

import { Form, Select, Input, InputNumber, Button, Checkbox } from "antd";

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
  users: Array<any>;
}

const Review: NextPage<IGetInitialProps> = ({
  tasks,
  users,
}: IGetInitialProps) => {
  const tasksNames = tasks.map((i) => (
    <Option value={i.taskName} key={uniqid()}>
      {i.taskName}
    </Option>
  ));

  const userNames = users.map((i) => (
    <Option value={i.login} key={uniqid()}>
      {i.login}
    </Option>
  ));

  const handleChangeStudent = (e) => {
    console.log("handleChangeStudent", e);
  };

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
          label="Task"
          name="task"
          rules={[
            {
              required: true,
              message: "Please choose your task!",
            },
          ]}
        >
          <Select placeholder="please check task" onChange={handleChange}>
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
          <Select
            placeholder="student"
            onChange={handleChangeStudent}
            menuItemSelectedIcon={
              <UserOutlined className="site-form-item-icon" />
            }
          >
            {userNames}
          </Select>
        </Form.Item>

        <Form.Item name="checkbox">
          <Checkbox onClick={onCheck} name="check-box" checked={false}>
            Make my name visible in feedback
          </Checkbox>
        </Form.Item>
        <Form.Item label="Score" name="score">
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
  const resTasks = await fetch(`http://localhost:4000/tasks`);
  const jsonTasks = await resTasks.json();

  const resUsers = await fetch(`http://localhost:4000/users`);
  const jsonUsers = await resUsers.json();

  return { tasks: jsonTasks, users: jsonUsers };
};

export default Review;
