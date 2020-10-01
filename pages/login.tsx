import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { changeStore } from "../redux/actions/LoginActions/roleAction";
import { changeAuthStatus } from "../redux/actions/LoginActions/authAction";

import Welcome from "../components/login/Welcome";
import MainLayout from "../components/layout/MainLayout";

import styles from "../styles/login.module.scss";

import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

const users = ["student", "mentor", "admin"];

interface IChangeValue {
  role: string;
  login: string;
}

interface ILogin {
  changeValue: (data: IChangeValue) => void;
  changeAuthStatus: (payload: boolean) => void;
  isAuth: boolean;
}

const Login: React.FC<ILogin> = ({
  changeValue,
  changeAuthStatus,
  isAuth,
}: ILogin) => {
  const [checkedItem, setCheckedItem] = useState(users[0]);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [usersDB, setUsersDB] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => setUsersDB(res.data));
  }, []);

  // api functions
  const isGetGitHubLogin = (login) => {
    if (login)
      return axios
        .get(`https://api.github.com/users/${login}`)
        .then((data) => {
          const img = data.data.avatar_url;
          setCurrentImg(img);
          postToDB(login, checkedItem, img);
          changeAuthStatus(true);
          return true;
        })
        .catch((err) => {
          openModal(err.response.status);
          return false;
        });
  };

  const isCheckUserInDB = (currentUser, users) => {
    const usersArr = users.map((i) => i.login);
    return usersArr.includes(currentUser);
  };

  const postToDB = (login, role, img) => {
    if (!isCheckUserInDB(login, usersDB)) {
      axios.post("http://localhost:4000/users", {
        login: login,
        role: role,
        img: img,
      });
    }
  };

  const onHandleClickCheckbox = (dataCheckbox: string): void => {
    setCheckedItem(dataCheckbox);
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

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUserName(e.target.value);
  };

  const submitFormHandler = (e) => {
    const checkUser = isGetGitHubLogin(e.login);
    checkUser.then((data) => {
      if (data) {
        changeValue({ role: checkedItem, login: currentUserName });
      }
    });
  };

  return (
    <MainLayout title="login page">
      <div className={styles.container}>
        <Welcome imgSrc={currentImg} isAuth={isAuth} />
        <Form name="basic" onFinish={submitFormHandler}>
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
              value=""
              onChange={changeHandler}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Github login"
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.checkBoxes}>
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
      </div>
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:4000/users");
  const usersDB = await res.json();

  return {
    props: {
      usersDB,
    },
  };
};

const mapStateToProps = (state) => ({
  chooseRole: state.chooseRole,
  isAuth: state.changeAuthStatus.isAuth,
});

const mapDispatchToProps = {
  changeValue: changeStore,
  changeAuthStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
