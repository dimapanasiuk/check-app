import React from "react";
import rdmd from "@readme/markdown";

import { Typography } from 'antd';

const { Title } = Typography;

interface ICheckTask {
  rmBody: string;
  taskName: string;
  maxScore: number;
  taskDescription: string;
  date: Array<string>;
}

const CheckTask: React.FC<ICheckTask> = ({
  rmBody,
  taskName,
  maxScore,
  taskDescription,
  date,
}: ICheckTask) => {

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Title level={2}>Check Task</Title>
        <Title level={2}>Your task name: {taskName}</Title>
        <Title level={2}>Date start: {date[0]}</Title>
        <Title level={2}>Deadline: {date[1]}</Title>

        <Title level={2}>Your maximum score: {maxScore} </Title>
        {taskDescription && (
          <React.Fragment>
            <Title level={2}>Task description:</Title>
            <Title style={{ margin: "0 auto", maxWidth: "1000px" }}>
              {taskDescription}
            </Title>
          </React.Fragment>
        )}
      </div>
      {rdmd(rmBody)}
    </>
  );
};

export default CheckTask;
