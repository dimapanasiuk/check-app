import React from "react";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";

import CodeBlock from "./CodeBlock";
import { Typography, Space } from "antd";

import styles from "../../styles/Markdown.module.scss";

const { Title, Text } = Typography;

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
      <Space direction="vertical">
        <Title level={1}>Check Task</Title>
        <Title className={styles.title} level={4}>
          Your task name: <Text>{taskName}</Text>
        </Title>
        <Title className={styles.title} level={4}>
          Date start: <Text>{date[0]}</Text>
        </Title>
        <Title className={styles.title} level={4}>
          Deadline: <Text>{date[1]}</Text>
        </Title>

        <Title className={styles.title} level={4}>
          Your maximum score: <Text>{maxScore}</Text>
        </Title>
        {taskDescription && (
          <>
            <Title className={styles.title} level={4}>
              Task description:
            </Title>
            <Text style={{ margin: "0 auto", maxWidth: "1000px" }}>
              {taskDescription}
            </Text>
          </>
        )}
      </Space>
      <article className={classNames(styles.markdown, styles.markdownMargin)}>
        <ReactMarkdown source={rmBody} renderers={{ code: CodeBlock }} />
      </article>
    </>
  );
};

export default CheckTask;
