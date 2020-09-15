import React from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";
import YourScore from "../components/score/YourScore";
import AllScore from "../components/score/AllScore";

import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

interface IScore {
  tasks: Array<any>;
  completedTasks: Array<any>;
  users: Array<any>;
}

const Score: NextPage<IScore> = ({ tasks, completedTasks, users }: IScore) => (
  <MainLayout title="score page">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="All score" key="1">
        <AllScore tasks={tasks} completedTasks={completedTasks} users={users} />
      </TabPane>
      <TabPane tab="Your score" key="2">
        <YourScore />{" "}
      </TabPane>
    </Tabs>
  </MainLayout>
);

Score.getInitialProps = async () => {
  const resUsers = await fetch(`http://localhost:4000/users`);
  const jsonUsers = await resUsers.json();

  const resTasks = await fetch(`http://localhost:4000/tasks`);
  const jsonTasks = await resTasks.json();

  const resCompletedTasks = await fetch(`http://localhost:4000/completedTasks`);
  const jsonCompletedTasks = await resCompletedTasks.json();

  return {
    tasks: jsonTasks,
    completedTasks: jsonCompletedTasks,
    users: jsonUsers,
  };
};

export default Score;
