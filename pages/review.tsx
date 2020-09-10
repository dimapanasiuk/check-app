import React, { useState } from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";

import { Form, Select, Input, InputNumber, Button, Checkbox } from "antd";

import { UserOutlined } from "@ant-design/icons";

import uniqid from "uniqid";

const { TextArea } = Input;
const { Option } = Select;

interface IGetInitialProps {
  data: any;
}

const Review: NextPage<IGetInitialProps> = ({ data }: IGetInitialProps) => {
  const [chooseTask, setChooseTask] = useState(false);
  const [chooseUser, setChooseUser] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [users, setUsers] = useState([]);

  const tasks = data.map((i) => i.taskName);
  const uniqueTasks = Array.from(new Set(tasks));

  const usersWithThisTasks = (task, arr) =>
    arr.filter((i) => i.taskName === task);

  const tasksNames = uniqueTasks.map((i) => (
    <Option value={`${i}`} key={uniqid()}>
      {i}
    </Option>
  ));

  const usersHtml = users.map((i) => (
    <Option value={`${i}`} key={uniqid()}>
      {i}
    </Option>
  ));

  const handleChangeTask = (task) => {
    setChooseTask(true);

    const users = usersWithThisTasks(task, data).map((i) => i.user);
    setUsers(users);
  };

  const handleChangeStudent = (e) => {
    setChooseUser(true);
  };

  const submitFormHandler = (e) => {
    const { task, student, score, comment } = e;
    isCheck;
  };

  const checkBoxHandler = () => {
    setIsCheck(!isCheck);
  };

  return (
    <MainLayout title="review page">
      <Form name="basic" layout="vertical" onFinish={submitFormHandler}>
        <Form.Item label="Task" name="task">
          <Select placeholder="please check task" onChange={handleChangeTask}>
            {tasksNames}
          </Select>
        </Form.Item>
        <Form.Item label="Student" name="student">
          <Select
            placeholder="student"
            onChange={handleChangeStudent}
            disabled={!chooseTask}
            menuItemSelectedIcon={
              <UserOutlined className="site-form-item-icon" />
            }
          >
            {usersHtml}
          </Select>
        </Form.Item>
        <Form.Item name="checkbox">
          <Checkbox
            onChange={checkBoxHandler}
            checked={isCheck}
            disabled={!chooseUser}
          >
            Make my name visible in feedback
          </Checkbox>
        </Form.Item>
        <Form.Item
          label="Score"
          name="score"
          rules={[
            {
              required: true,
              message: "enter score",
            },
          ]}
        >
          <InputNumber min={1} max={500} disabled={!chooseUser} />
        </Form.Item>
        <Form.Item
          name="comment"
          label="comment"
          rules={[
            {
              required: true,
              message: "enter comment",
            },
          ]}
        >
          <TextArea
            disabled={!chooseUser}
            autoSize={true}
            style={{ minHeight: "70px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!chooseUser}>
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

  const res = await fetch(`http://localhost:4000/completedTasks`);
  const json = await res.json();

  return { tasks: jsonTasks, users: jsonUsers, data: json };
};

export default Review;
