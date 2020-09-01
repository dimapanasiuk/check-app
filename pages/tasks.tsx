import React, { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";
import styles from "../styles/Tasks.module.scss";

import { Pagination, Typography, Card } from "antd";

const { Meta } = Card;
const { Title } = Typography;

export interface ITaskData {
  id: string;
  taskName: string;
  taskDescription: string;
  maxScore: number;
  markdown: string;
}

interface IGetInitialProps {
  tasks: Array<ITaskData>;
}

const Tasks: NextPage<IGetInitialProps> = ({ tasks }: IGetInitialProps) => {
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
              </Card>
            </a>
          </Link>
        </li>
      );
    });
  };

  console.log("task", allTaskHtml(tasks));

  return (
    <MainLayout title="tasks">
      <Title level={2}>Your task</Title>
      <ul className={styles.layout}>
        {(() => {
          let start = currentPaginationPage - 1;
          const end = currentPaginationPage * defaultPageSize;
          if (currentPaginationPage === 1) {
            return allTaskHtml(tasks).slice(start, end);
          } else {
            start = currentPaginationPage * defaultPageSize - defaultPageSize;
            return allTaskHtml(tasks).slice(start, end);
          }
        })()}
      </ul>
      <Pagination
        defaultCurrent={currentPaginationPage}
        total={tasksAmount}
        defaultPageSize={defaultPageSize}
        onChange={changeHandlerPagination}
      />
    </MainLayout>
  );
};

Tasks.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const json = await res.json();

  return { tasks: json };
};

export default Tasks;
