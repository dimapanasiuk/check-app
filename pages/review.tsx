import React from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";

import { Select } from "antd";
import uniqid from "uniqid";

const { Option } = Select;

interface ITaskData {
  id: string;
  taskName: string;
  taskDescription: string;
  maxScore: number;
  markdown: string;
}

interface IGetInitialProps {
  tasks: Array<ITaskData>;
}

const Review: NextPage<IGetInitialProps> = ({ tasks }: IGetInitialProps) => {
  const tasksNames = tasks.map((i) => (
    <Option value={i.taskName} key={uniqid()}>
      {i.taskName}
    </Option>
  ));

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <MainLayout title="review page">
      <h1>Review</h1>

      <Select defaultValue='please check task' onChange={handleChange}   style={{ width: 200 }}>
        {tasksNames}
      </Select>
    </MainLayout>
  );
};

Review.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const json = await res.json();

  return { tasks: json };
};

export default Review;
