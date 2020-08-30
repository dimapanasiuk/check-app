import React from "react";
import { NextPage } from "next";
import MaiLayout from "../../components/MainLayout";
import { ITaskData } from "../tasks";
import { Divider, Button, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";

const { confirm } = Modal;

interface IGetInitialProps {
  taskData: ITaskData;
}

const Task: NextPage<IGetInitialProps> = ({ taskData }: IGetInitialProps) => {
  const router = useRouter();

  const deleteTask = async () => {
    const nodeId = router.query.id;
    try {
      await axios.delete(`http://localhost:4000/tasks/${nodeId}`);

      router.push("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  const showSuccessMessage = () => {
    message.success("Task has been deleted");
  };

  const showConfirm = () => {
    confirm({
      title: "Do you really want to delete this task?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteTask();
        showSuccessMessage();
      },
    });
  };

  return (
    <MaiLayout title={`task ${taskData.taskName}`}>
      <div style={{ fontSize: "16px" }}>
        <Button type="danger" onClick={showConfirm}>
          <DeleteOutlined /> Delete
        </Button>
        <Divider orientation="left">Task name</Divider>
        <div>{taskData.taskName}</div>
        {taskData.taskDescription && (
          <React.Fragment>
            <Divider orientation="left">Task description</Divider>
            <div>{taskData.taskDescription}</div>
          </React.Fragment>
        )}
        <Divider orientation="left">Max score</Divider>
        <div>{taskData.maxScore}</div>
        {taskData.markdown && (
          <React.Fragment>
            <Divider orientation="left">Markdown</Divider>
            <div>{taskData.markdown}</div>
          </React.Fragment>
        )}
      </div>
    </MaiLayout>
  );
};

Task.getInitialProps = async (ctx) => {
  const res = await fetch(`http://localhost:4000/tasks/${ctx.query.id}`);
  const json = await res.json();

  return { taskData: json };
};

export default Task;
