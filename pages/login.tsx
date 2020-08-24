import React from "react";
import axios from "axios";

import MainLayout from "../components/MainLayout";

import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

const users = ["Pupil", "Mentor", "Admin", "Super User"];

// should separate logic from ui
// post method for the new users if they have github account

function useMounted() {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}

const Login: React.FC = () => {
  // states
  const [checkedItem, setCheckedItem] = React.useState<string>("Pupil");
  const [inputValue, setInputValue] = React.useState<string | undefined>("");
  const [submitClickIndicator, setSubmitClick] = React.useState<boolean>(true);
  const [gitHubLogin, setGitHubLogin] = React.useState<string | null>(null);

  // custom hook to cancel the first call of useEffect
  const isMounted = useMounted();

  React.useEffect(() => {
    document.body.addEventListener("click", closeModal);

    return () => {
      document.body.removeEventListener("click", closeModal);
    };
  }, []);

  React.useEffect(() => {
    if (isMounted)
      axios
        .get(`https://api.github.com/users/${inputValue}`)
        .then((data) => {
          data && setGitHubLogin(data.data.login);
          compareWithUsers(data.data.login);
        })
        .catch((err) => {
          err.response.status === 404
            ? compareWithUsers(null)
            : openErrorModal();
        });
  }, [submitClickIndicator]);

  const onHandleClickCheckbox = (dataCheckbox: string): void => {
    setCheckedItem(dataCheckbox);
  };

  const onHandleInputValue = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  const onHandleSubmitClicked = (): void => {
    setSubmitClick((submitClickIndicator) => !submitClickIndicator);
  };

  // Modal Window
  const openNotFoundModal = (): void => {
    Modal.error({
      title: "Can`t get access",
      content: "Please enter an existing github login",
    });
  };

  const openErrorModal = (): void => {
    Modal.error({
      title: "Error",
      content: "Please try again",
    });
  };

  const closeModal = (): void => {
    Modal.destroyAll();
  };

  // Other Functions
  const compareWithUsers = (login: string): void => {
    if (!login) {
      openNotFoundModal();
    }
  };

  const onFinishFailed = (errorInfo): void => {
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
