import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Checking_name",
    dataIndex: "checking_name",
    key: "checking_name",
  },
  {
    title: "Task",
    dataIndex: "task",
    key: "task",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
  },
];

const data = [
  {
    key: "1",
    checking_name: "Oleg",
    task: "song bird",
    score: 240,
    comments: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    checking_name: "Alex",
    task: "check-app",
    score: 500,
    comments: "London No. 1 Lake Park",
  },
  {
    key: "3",
    checking_name: "Elena",
    task: "react task",
    score: 45,
    comments: "Sidney No. 1 Lake Park",
  },
];
const YourScore: React.FC = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default YourScore;
