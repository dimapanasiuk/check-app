import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { NextPage } from "next";

import MainLayout from "../components/MainLayout";

import { Typography } from "antd";

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
      <ul>
        {tasks.map((i) => (
          <li key={i.id}>
            <Link href={`task/[id]`} as={`/task/${i.id}`}>
              <a>{i.name}</a>
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
