import React from "react";
import axios from "axios";
import { uuid } from "uuidv4";

import MainLayout from "../components/MainLayout";

import { Form, Input, Button } from "antd";

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 12,
  },
};

const addNewTask = (name: string, target: string, technologies: string) => {
  axios
    .post("http://localhost:4000/tasks", {
      id: uuid(),
      name: name,
      target: target,
      technologies: technologies,
    })
    .then(function (response) {
      console.log("response", response);
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

const Create = () => {
  const onFinish = (values) => {
    const { name, target, technologies } = values;
    addNewTask(name, target, technologies);
  };

  return (
    <MainLayout title="create task">
      <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item name={"name"} label="Name Task">
          <Input />
        </Form.Item>

        <Form.Item name={"target"} label="Цели задания">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name={"technologies"} label="Технологии">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default Create;
