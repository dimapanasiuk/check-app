import React from "react";
import { Table } from "antd";
import { v4 as uuidv4 } from "uuid";

interface IYourScore {
  tasks: Array<any>;
  tasksReview: Array<any>;
}

const YourScore: React.FC<IYourScore> = ({
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

  const generateData = (tasks) => {
    const arrTasks = tasks.map((i) => i.taskName);

    const arrTasksData = arrTasks.map((item, i) => {
      const reviewersForCurrentTask = tasksReview.filter(
        (y) => y.taskName === item
      );

      const arr = reviewersForCurrentTask.map((x) => {
        return {
          key: uuidv4(),
          Task: "",
          CheckName: x.reviewer,
          Score: x.score,
          Comment: x.comment,
        };
      });

      return {
        key: uuidv4(),
        Task: item,
        CheckName: "—",
        Score: "—",
        Comment: "—",
        children: arr,
      };
    });

    return arrTasksData;
  };

  return (
    <>
      <h1>Your score</h1>
      <Table columns={columns} dataSource={generateData(tasks)} />
    </>
  );
};

export default YourScore;
