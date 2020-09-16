import React, { useState } from "react";
import { NextPage } from "next";
import MaiLayout from "../../components/layout/MainLayout";
import EditModal from "../../components/tasks/EditModal";
import { ITaskData } from "../tasks";
import { Divider, Button, Modal, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

const { confirm } = Modal;

interface IGetInitialProps {
  taskData: ITaskData;
}

const Task: NextPage<IGetInitialProps> = ({ taskData }: IGetInitialProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const userRole = useSelector((state) => state.chooseRole.role);

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

  const editTask = async (obj: ITaskData) => {
    const nodeId = router.query.id;
    try {
      await axios.put(`http://localhost:4000/tasks/${nodeId}`, obj);

      router.push("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = () => {
    setIsVisible(true);
  };

  const closeEditModal = () => {
    setIsVisible(false);
  };

  return (
    <MaiLayout title={`task ${taskData.taskName}`}>
      <div style={{ fontSize: "16px" }}>
        <EditModal
          taskData={taskData}
          editTask={editTask}
          isVisible={isVisible}
          closeEditModal={closeEditModal}
        />
        {(userRole === "mentor" || userRole === "admin") && (
          <>
            <Button danger onClick={showConfirm}>
              <DeleteOutlined /> Delete
            </Button>
            <Button
              type="primary"
              onClick={openEditModal}
              style={{ marginLeft: "20px" }}
            >
              <EditOutlined /> Edit
            </Button>
          </>
        )}
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
