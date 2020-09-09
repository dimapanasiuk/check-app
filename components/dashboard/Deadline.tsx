import React from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "../../styles/Performance.module.scss";

import { Typography } from "antd";
const { Title } = Typography;

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

const Deadline: React.FC<IGetInitialProps> = ({ tasks }: IGetInitialProps) => {
  let tasksHml;

  if (tasks.length !== 0) {
    tasksHml = tasks.map((i) => {
      return (
        <div key={uuidv4()}>
          <Title>{i.taskName}</Title>
          <Title>Start {i.date[0]}</Title>
          <Title>Finish {i.date[1]}</Title>
        </div>
      );
    });
  } else {
    tasksHml = <Title level={4}>{`U don't have any deadline`}</Title>;
  }

  return (
    <>
      <div className={styles.layout}>{tasksHml}</div>
    </>
  );
};

export default Deadline;
