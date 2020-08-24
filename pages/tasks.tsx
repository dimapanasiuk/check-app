import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NextPage } from "next";

import MainLayout from "../components/MainLayout";
import styles from "../styles/Tasks.module.scss";

import { Typography, Card } from "antd";

const { Meta } = Card;
const { Title } = Typography;

interface ITaskData {
  id: string;
  target: string;
  name: string;
  technologies: string;
}

interface IGetInitialProps {
  tasks: Array<ITaskData>;
}

const Tasks: NextPage<IGetInitialProps> = ({ tasks }: IGetInitialProps) => {
  return (
    <MainLayout title="tasks">
      <Title level={2}>Your task</Title>
      <ul className={styles.layout}>
        {tasks.map((i) => (
          <li key={i.id} className={styles.list}>
            <Link href={`task/[id]`} as={`/task/${i.id}`}>
              <a>
                <Card hoverable style={{ width: 240, listStyleType: "none" }}>
                  <Meta title={i.name} description={i.target} />
                </Card>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};

Tasks.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const json = await res.json();

  return { tasks: json };
};

export default Tasks;
