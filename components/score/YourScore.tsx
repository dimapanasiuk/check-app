import React from "react";
import { Table } from "antd";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";

interface IYourScore {
  login: string;
  tasks: Array<any>;
  tasksReview: Array<any>;
}

const YourScore: React.FC<IYourScore> = ({
  login,
  tasks,
  tasksReview,
}: IYourScore) => {
  const columns = [
    {
      title: "Task",
      dataIndex: "Task",
      key: "Task",
    },
    {
      title: "CheckName",
      dataIndex: "CheckName",
      key: "CheckName",
    },
    {
      title: "Score",
      dataIndex: "Score",
      key: "Score",
    },
    {
      title: "Comment",
      dataIndex: "Comment",
      width: "40%",
      key: "Comment",
    },
  ];

  const getTasksReviewCurrentTask = (task, tasksReview, login) => {
    const tasks = tasksReview.filter(
      (y) => y.taskName === task && y.reviewer !== login
    );

    const arr = tasks.map((x) => {
      return {
        key: uuidv4(),
        Task: "",
        CheckName: x.visible ? x.reviewer : "—",
        Score: x.score,
        Comment: x.comment,
      };
    });

    return arr;
  };

  const generateData = (tasks, tasksReview, login) => {
    const arrTasks = tasks.map((i) => i.taskName);

    const arrTasksData = arrTasks.map((i) => {
      return {
        key: uuidv4(),
        Task: i,
        CheckName: "—",
        Score: "—",
        Comment: "—",
        children: getTasksReviewCurrentTask(i, tasksReview, login),
      };
    });

    return arrTasksData;
  };

  return (
    <>
      <h1>Your score</h1>
      <Table
        columns={columns}
        dataSource={generateData(tasks, tasksReview, login)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({ login: state.chooseRole.login });

export default connect(mapStateToProps)(YourScore);
