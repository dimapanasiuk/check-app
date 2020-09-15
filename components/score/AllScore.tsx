import React, { useState, useEffect } from "react";
import axios from "axios";

import { Table } from "antd";

const AllScore: React.FC = () => {
  const [completedTasks, setСompletedTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksReview = axios("http://localhost:4000/completedTasks");
    tasksReview.then((data) => setСompletedTasks(data.data));

    const tasks = axios("http://localhost:4000/tasks");
    tasks.then((data) => setTasks(data.data));

    const users = axios("http://localhost:4000/users");
    users.then((data) => setUsers(data.data));
  }, []);

  const uniqValues = (arr, key) => {
    const uniqArr = arr.map((i) => i[key]);
    return Array.from(new Set(uniqArr));
  };

  const uniqUsers = uniqValues(users, "login");
  const tasksArr = uniqValues(tasks, "taskName");

  const columns = [
    {
      title: "Github_login",
      dataIndex: "Github_login",
      key: "Github_login",
    },
  ];

  tasksArr.map((i) =>
    columns.push({
      title: `${i}`,
      dataIndex: `${i}`,
      key: `${i}`,
    })
  );

  const getScore = (arr, name, task) => {
    const data = arr.filter((i) => i.user === name && i.taskName === task);
    if (data.length) {
      return data[data.length - 1].yourScore;
    }
    return 0;
  };

  const dataForTable = (users) => {
    const dataForTable = [];
    const uniqColumns = uniqValues(columns, "title");

    users.map((item, i) => {
      const obj = { key: i };
      let name;

      uniqColumns.forEach((x, y) => {
        if (y === 0) {
          name = item;
          return (obj[`${x}`] = item);
        }
        const score = getScore(completedTasks, name, x);
        return (obj[`${x}`] = score);
      });

      dataForTable.push(obj);
    });
    return dataForTable;
  };

  return <Table dataSource={dataForTable(uniqUsers)} columns={columns} />;
};

export default AllScore;
