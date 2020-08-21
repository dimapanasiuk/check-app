import React from "react";
import axios from "axios";

import MainLayout from "../components/MainLayout";

import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

const users = ["Pupil", "Mentor", "Admin"];

// should separate logic from ui
// check github api and comparing inputValue with github logins
// post method for the new users if they have github account
const Login: React.FC = () => {
  // states
  const [checkedItem, setCheckedItem] = React.useState<string>("Pupil");
  const [inputValue, setInputValue] = React.useState<string | undefined>("");
  const [isSubmitClicked, setIsSubmitClicked] = React.useState<boolean>(true);
  const [gitHubLogin, setGitHubLogin] = React.useState<string | null>(null);

  // useEffect
  React.useEffect(() => {
    document.body.addEventListener("click", closeModal);
  }, []);

  React.useEffect(() => {
    axios
      .get(`https://api.github.com/users/${inputValue}`)
      .then((data) => {
        data && setGitHubLogin(data.data.login);
        compareWithUsers();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [isSubmitClicked]);

  // Handlers
  const onHandleClickCheckbox = (dataCheckbox: string) => {
    setCheckedItem(dataCheckbox);
  };

  const onHandleInputValue = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  const onHandleSubmitClicked = () => {
    setIsSubmitClicked((isSubmitClicked) => !isSubmitClicked);
  };

  // Modal Window
  const openModal = () => {
    Modal.error({
      title: "Can`t get access",
      content: "Please enter an existing github login",
    });
  };

  const closeModal = () => {
    Modal.destroyAll();
  };

  // Other Functions
  const compareWithUsers = () => {
    if (!gitHubLogin) {
      openModal();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout title="login">
      <Form
        style={{ marginTop: "100px" }}
        name="basic"
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
                onClick={() => {
                  onHandleClickCheckbox(user);
                }}
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
            onClick={() => {
              onHandleSubmitClicked();
              compareWithUsers();
            }}
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
