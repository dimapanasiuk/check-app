import React from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "../../styles/Performance.module.scss";

import { Progress, Typography } from "antd";
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

const Performance: React.FC<IGetInitialProps> = ({
  tasks,
}: IGetInitialProps) => {
  let tasksHml;

  if (tasks.length !== 0) {
    tasksHml = tasks.map((i) => {
      return (
        <div key={uuidv4()}>
          <Progress type="circle" percent={0} width={80} />
          <Title level={4}>{i.taskName}</Title>
        </div>
      );
    });
  } else {
    tasksHml = <Title level={4}>{`U don't have any task`}</Title>;
  }

  return (
    <>
      <div className={styles.layout}>{tasksHml}</div>
    </>
  );
};

export default Performance;
