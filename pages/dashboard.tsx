import React from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";
import Performance from "../components/dashboard/Performance";
import Deadline from "../components/dashboard/Deadline";

import styles from "../styles/dashboard.module.scss";

import { Card } from "antd";

interface ITaskData {
  id: string;
  taskName: string;
  taskDescription: string;
  maxScore: number;
  markdown: string;
  date: Array<string>;
}

interface IGetInitialProps {
  tasks: Array<ITaskData>;
}

const Dashboard: NextPage<IGetInitialProps> = ({ tasks }: IGetInitialProps) => {
  return (
    <>
      <MainLayout title="dashboard page">
        <div className={styles.layout}>
          <Card title="Performance" bordered={false} style={{ maxWidth: 500 }}>
            <Performance tasks={tasks} />
          </Card>
          <Card
            title="Tasks deadline"
            bordered={false}
            style={{ maxWidth: 500 }}
          >
            <Deadline tasks={tasks} />
          </Card>
        </div>
      </MainLayout>
    </>
  );
};

Dashboard.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const json = await res.json();

  return { tasks: json };
};

export default Dashboard;
