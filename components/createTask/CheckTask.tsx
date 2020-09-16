import React from "react";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";

import CodeBlock from "./CodeBlock";
import { Typography } from "antd";

import styles from "../../styles/Markdown.module.scss";

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
          <>
            <Title level={2}>Task description:</Title>
            <Title style={{ margin: "0 auto", maxWidth: "1000px" }}>
              {taskDescription}
            </Title>
          </>
        )}
      </div>
      <article className={classNames(styles.markdown, styles.markdownMargin)}>
        <ReactMarkdown source={rmBody} renderers={{ code: CodeBlock }} />
      </article>
    </>
  );
};

export default CheckTask;
