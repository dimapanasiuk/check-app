import React, { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";
import Performance from "../components/tasks/Performance";
import Deadline from "../components/tasks/Deadline";
import styles from "../styles/tasks.module.scss";

import { Button, Pagination, Typography, Card } from "antd";

const { Meta } = Card;
const { Title } = Typography;

export interface ITaskData {
  id: string;
  taskName: string;
  taskDescription: string;
  maxScore: number;
  markdown: string;
  date: Array<string>;
}

interface IGetInitialProps {
  tasks: Array<ITaskData>;
  completedTasks: Array<any>;
}

const Tasks: NextPage<IGetInitialProps> = ({
  tasks,
  completedTasks,
}: IGetInitialProps) => {
  const tasksAmount = tasks.length;
  const defaultPageSize = 10;
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

  const changeHandlerPagination = (e) => {
    setCurrentPaginationPage(e);
  };

  const allTaskHtml = (tasks) => {
    return tasks.map((i) => {
      const description =
        i.taskDescription && i.taskDescription.split(" ").splice(0, 5);
      i.taskDescription.split(" ").length > 5 && description.push("...");
      description.join(" ");
      return (
        <li key={i.id} className={styles.list}>
          <Link href={`task/[id]`} as={`/task/${i.id}`}>
            <a>
              <Card
                hoverable
                style={{
                  width: 240,
                  listStyleType: "none",
                  margin: "0 20px 20px 0",
                }}
              >
                <Meta title={i.taskName} description={description} />
                <Deadline start={i.date[0]} end={i.date[1]} />
                <Performance
                  maxScore={i.maxScore}
                  completed={completedTasks}
                  taskName={i.taskName}
                />
              </Card>
            </a>
          </Link>
        </li>
      );
    });
  };

  return (
    <MainLayout title="tasks">
      {(() => {
        if (tasks.length !== 0) {
          return (
            <>
              <Title level={2}>Your task</Title>
              <ul className={styles.layout}>
                {(() => {
                  let start = currentPaginationPage - 1;
                  const end = currentPaginationPage * defaultPageSize;
                  if (currentPaginationPage === 1) {
                    return allTaskHtml(tasks).slice(start, end);
                  } else {
                    start =
                      currentPaginationPage * defaultPageSize - defaultPageSize;
                    return allTaskHtml(tasks).slice(start, end);
                  }
                })()}
              </ul>

              <Pagination
                className={styles.pagination}
                defaultCurrent={currentPaginationPage}
                total={tasksAmount}
                defaultPageSize={defaultPageSize}
                onChange={changeHandlerPagination}
              />
            </>
          );
        } else {
          return (
            <>
              <Title level={2}>{"You don't have tasks"}</Title>
              <Button type="primary">
                <Link href="/">
                  <a>Go to home</a>
                </Link>
              </Button>
            </>
          );
        }
      })()}
    </MainLayout>
  );
};

Tasks.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const json = await res.json();

  const resCompletedTasks = await fetch(`http://localhost:4000/completedTasks`);
  const jsonCompletedTasks = await resCompletedTasks.json();

  return { tasks: json, completedTasks: jsonCompletedTasks };
};

export default Tasks;
