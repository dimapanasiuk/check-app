import React from "react";

import MainLayout from "../components/MainLayout";

import { Form, Input, Button, Checkbox, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

const getUserData = (name: string): void => {
  fetch(`https://api.github.com/users/${name}`).then((response) =>
    response
      .json()
      .then((data) => console.log("uesr data", data))
      .catch(console.error)
  );
  return null;
};

const users = ["Pupil", "Mentor", "Admin"];

const Login: React.FC = () => {
  const [checkedItem, setCheckedItem] = React.useState<number | null>(null);
  const onFinish = (values) => {
    getUserData(values.username);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClickCheckedHandler = (index: number) => {
    setCheckedItem(index);
  };

  return (
    <MainLayout title="login">
      <Form
        style={{ marginTop: "100px" }}
        name="basic"
        initialValues={{
          Pupil: true,
          Teacher: false,
          Admin: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "30px",
          }}
        >
          {users.map((user, index) => (
            <Checkbox
              onClick={() => onClickCheckedHandler(index)}
              name={user}
              key={index}
              checked={checkedItem === index}
            >
              {user}
            </Checkbox>
          ))}
        </div>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default Login;
