import React from "react";

import MainLayout from "../components/MainLayout";

import { Form, Input, Button, Checkbox, Modal } from "antd";
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
  const [checkedItem, setCheckedItem] = React.useState<string>("Pupil");
  const [inputValue, setInputValue] = React.useState<string | undefined>("");

  const onFinish = (values) => {
    getUserData(values.username);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClickCheckedHandler = (dataCheckbox: string) => {
    setCheckedItem(dataCheckbox);
  };

  const onHandleInputValue = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  const compareWithUsers = () => {
    if (inputValue !== "Gordey") {
      Modal.error({
        title: "Can`t get access",
        content: "Please enter an existing github login",
      });
    }
  };

  const closeModal = () => {
    Modal.destroyAll();
  };

  React.useEffect(() => {
    document.body.addEventListener("click", closeModal);
  }, []);

  return (
    <MainLayout title="login">
      <Form
        style={{ marginTop: "100px" }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your github login!",
            },
          ]}
        >
          <Input
            value={inputValue}
            onChange={onHandleInputValue}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Github login"
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "30px",
              marginTop: "10px",
            }}
          >
            {users.map((user, index) => (
              <Checkbox
                onClick={() => onClickCheckedHandler(user)}
                name={user}
                key={index}
                checked={checkedItem === user}
              >
                {user}
              </Checkbox>
            ))}
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={compareWithUsers}
            block
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default Login;
