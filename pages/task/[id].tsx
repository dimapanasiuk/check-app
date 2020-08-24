import React from "react";
import { NextPage } from "next";
import MaiLayout from "../../components/MainLayout";

interface IGetInitialProps {
  taskData: any;
}

const Task: NextPage<IGetInitialProps> = ({ taskData }: IGetInitialProps) => {
  return (
    <MaiLayout title={`task ${taskData.name}`}>
      <h1>{taskData.name}</h1>
    </MaiLayout>
  );
};

Task.getInitialProps = async (ctx) => {
  const res = await fetch(`http://localhost:4000/tasks/${ctx.query.id}`);
  const json = await res.json();

  return { taskData: json };
};

export default Task;
