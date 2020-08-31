import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { changeStore } from "../redux/actions/roleAction";
import MainLayout from "../components/MainLayout";

import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

const users = ["Student", "Mentor", "Admin", "Super User"];

type User = {
  id: number;
  login: string;
  role: string;
};

interface ILogin {
  usersDB: any;
  changeValue: () => void;
}

const Login: React.FC<ILogin> = ({ usersDB, changeValue }: ILogin) => {
  const [checkedItem, setCheckedItem] = React.useState<string>(users[0]);
  const [inputValue, setInputValue] = React.useState<string>("");

  // api functions
  const getGitLogin = () => {
    if (inputValue)
      axios
        .get(`https://api.github.com/users/${inputValue}`)
        .then(() => {
          postToDB();
        })
        .catch((err) => {
          openModal(err.response.status);
        });
  };

  const postToDB = () => {
    const isLoginInDB = checkOutDB();
    if (!isLoginInDB) {
      axios.post("http://localhost:4000/users", {
        login: inputValue,
        role: checkedItem,
      });
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", closeModal);

    return () => {
      document.body.removeEventListener("click", closeModal);
    };
  }, []);

  const onHandleClickCheckbox = (dataCheckbox: string): void => {
    // console.log("dataCheckbox", dataCheckbox);
    setCheckedItem(dataCheckbox);
  };

  const handleOnChange = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  // Modal Window
  const openModal = (errorStatus: number): void => {
    errorStatus === 404
      ? Modal.error({
          title: "Can`t get access",
          content: "Please enter an existing github login",
        })
      : Modal.error({
          title: "Error",
          content: "Please try again",
        });
  };

  const closeModal = (): void => {
    Modal.destroyAll();
  };

  const checkOutDB = () => {
    const logins = usersDB.map((userDB) => userDB.login);
    return logins.includes(inputValue);
  };

  const onFinish = (): void => {
    getGitLogin();
    changeValue(checkedItem);
  };

  return (
    <MainLayout title="Login">
      <Form style={{ marginTop: "100px" }} name="basic" onFinish={onFinish}>
        <Form.Item
          label="Login"
          name="login"
          rules={[
            {
              required: true,
              message: "Please input your github login!",
            },
          ]}
        >
          <Input
            value={inputValue}
            onChange={handleOnChange}
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
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:4000/users");
  const usersDB: User[] = await res.json();

  return {
    props: {
      usersDB,
    },
  };
};

const mapStateToProps = (state) => ({
  chooseRole: state.chooseRole.data,
});

const mapDispatchToProps = {
  changeValue: changeStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
