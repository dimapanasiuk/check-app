import React, { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { connect } from "react-redux";

import { uniqValues } from "../utils/utils";
import MainLayout from "../components/layout/MainLayout";

import {
  Form,
  Select,
  message,
  Input,
  InputNumber,
  Button,
  Checkbox,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Link } = Typography;

const { TextArea } = Input;
const { Option } = Select;

interface IGetInitialProps {
  login: string;
}

const Review: React.FC<IGetInitialProps> = ({ login }: IGetInitialProps) => {
  const [isChooseTask, setIsChooseTask] = useState(false);
  const [isChooseUser, setIsChooseUser] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [pr, setPr] = useState("");
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    const result = axios("https://rss-app-db.herokuapp.com/completedTasks");
    result.then((data) => setCompletedTasks(data.data));
  }, []);

  const tasks = completedTasks.map((i) => i.taskName);
  const uniqueTasks = uniqValues(tasks);

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
    setIsChooseTask(true);

    const users = usersWithThisTasks(task, completedTasks).map((i) => i.user);
    setUsers(users);
  };

  const handleChangeStudent = (student) => {
    setIsChooseUser(true);

    const PR = completedTasks.filter((i) => i.user === student);
    setPr(PR[0].pullRequest);
    setMaxScore(PR[0].maxScore);
  };

  const submitFormHandler = async (e) => {
    const { task, student, score, comment } = e;
    isCheck;

    await axios
      .post("https://rss-app-db.herokuapp.com/tasksReview", {
        reviewer: login,
        student: student,
        taskName: task,
        score: score,
        comment: comment,
        pullRequest: pr,
      })
      .then(() => {
        setIsChooseUser(false);
        setIsCheck(false);
        setPr("");
        setMaxScore(0);
        message.success("Check done");
      });
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
            disabled={!isChooseTask}
            menuItemSelectedIcon={
              <UserOutlined className="site-form-item-icon" />
            }
          >
            {usersHtml}
          </Select>
        </Form.Item>
        {(() => {
          if (pr) {
            return (
              <Form.Item>
                <Link href={pr} target="_blank">
                  {pr}
                </Link>
              </Form.Item>
            );
          }
        })()}

        <Form.Item name="checkbox">
          <Checkbox
            onChange={checkBoxHandler}
            checked={isCheck}
            disabled={!isChooseUser}
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
          <InputNumber min={1} max={maxScore} disabled={!isChooseUser} />
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
            disabled={!isChooseUser}
            autoSize={true}
            style={{ minHeight: "70px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isChooseUser}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

const mapStateToProps = (state) => {
  return { login: state.chooseRole.login };
};

export default connect(mapStateToProps)(Review);
