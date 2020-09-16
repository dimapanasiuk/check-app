import React from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";
import YourScore from "../components/score/YourScore";
import AllScore from "../components/score/AllScore";

import { Tabs } from "antd";

const { TabPane } = Tabs;

interface IScore {
  tasks: Array<any>;
  completedTasks: Array<any>;
  users: Array<any>;
  tasksReview: Array<any>;
}

const Score: NextPage<IScore> = ({
  tasks,
  completedTasks,
  users,
  tasksReview,
}: IScore) => (
  <MainLayout title="score page">
    <Tabs defaultActiveKey="1">
      <TabPane tab="All score" key="1">
        <AllScore tasks={tasks} completedTasks={completedTasks} users={users} />
      </TabPane>
      <TabPane tab="Your score" key="2">
        <YourScore tasks={tasks} tasksReview={tasksReview} />
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

  const resTasksReview = await fetch(`http://localhost:4000/tasksReview`);
  const jsonTasksReview = await resTasksReview.json();

  return {
    tasks: jsonTasks,
    completedTasks: jsonCompletedTasks,
    users: jsonUsers,
    tasksReview: jsonTasksReview,
  };
};

export default Score;
