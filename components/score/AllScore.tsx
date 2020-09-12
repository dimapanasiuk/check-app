import React, { useState, useEffect } from "react";
import axios from "axios";

import { Table } from "antd";

//import { uniqValues } from "../utils/utils";

const columns = [
  {
    title: "Github_id",
    dataIndex: "github_id",
    key: "github_id",
  },
  {
    title: "Tasks",
    dataIndex: "tasks",
    key: "tasks",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
  },
];

const AllScore: React.FC = () => {
  const [tasksReview, setTasksReview] = useState([]);

  useEffect(() => {
    const result = axios("http://localhost:4000/tasksReview");
    result.then((data) => setTasksReview(data.data));
  }, []);

  const row = [];

  tasksReview.forEach((i) => {
    row.push({
      key: i.id,
      github_id: i.student,
      tasks: i.taskName,
      score: i.score,
    });
  });

  return <Table columns={columns} dataSource={row} />;
};

export default AllScore;