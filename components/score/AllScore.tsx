import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Github_id",
    dataIndex: "github_id",
    key: "github_id",
  },
  {
    title: "Song_bird",
    dataIndex: "song_bird",
    key: "song_bird",
  },
  {
    title: "Check-app",
    dataIndex: "check-app",
    key: "check-app",
  },
  {
    title: "React_task",
    dataIndex: "react_task",
    key: "react_task",
  },
];

const data = [
  {
    key: "1",
    github_id: "katyachok",
    song_bird: 240,
    "check-app": 240,
    react_task: 500,
  },
  {
    key: "2",
    github_id: "GordeySt",
    song_bird: 240,
    "check-app": 500,
    react_task: 500,
  },
  {
    key: "3",
    github_id: "sofronovsd",
    song_bird: 240,
    "check-app": 45,
    react_task: 500,
  },
];
const AllScore: React.FC = () => {
  return <Table columns={columns} dataSource={data} />;
};
export default AllScore;
