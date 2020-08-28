import React, { useState } from "react";

import MainLayout from "../components/MainLayout";
import InitialTask from "../components/createTask/InitilTask";
import MarkdownPrew from "../components/createTask/MarkdownPrew";
import CheckTask from "../components/createTask/CheckTask";

import { Steps, Button, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { confirm } = Modal;

const Create = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [inputNumberValue, setInputNumberValue] = useState<number | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [mdBodyData, setMdBodyData] = useState<string>("");

  const getDataFromTaskname = (data: string) => {
    setTaskName(data);
  };

  const getDataFromMaxScore = (data: number) => {
    setInputNumberValue(data);
  };

  const getDataFromMarkdown = (data: string) => {
    setMdBodyData(data);
  };

  const getDataFromTaskDescription = (data: string) => {
    setTaskDescription(data);
  };

  const openErrorMessage = () => {
    message.error("Please enter task name and maximum score!");
  };

  const openConfirmWindow = () => {
    confirm({
      title: "Do you Want to leave markdown empty?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        next();
      },
    });
  };

  const checkInputValues = () => {
    !taskName || !inputNumberValue ? openErrorMessage() : next();
  };

  const checkMarkdownTextarea = () => {
    !mdBodyData ? openConfirmWindow() : next();
  };

  const steps = [
    {
      title: "Initial task",
      content: (
        <InitialTask
          getDataFoo={getDataFromTaskname}
          getDataFromInputNumber={getDataFromMaxScore}
          getDataFromTextArea={getDataFromTaskDescription}
          taskName={taskName}
          inputNumberValue={inputNumberValue}
          taskDescription={taskDescription}
        />
      ),
    },
    {
      title: "Create Markdown page",
      content: <MarkdownPrew getDataFoo={getDataFromMarkdown} />,
    },
    {
      title: "Check data",
      content: (
        <CheckTask
          rmBody={mdBodyData}
          taskName={taskName}
          maxScore={inputNumberValue}
          taskDescription={taskDescription}
        />
      ),
    },
  ];

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    const current = currentPage - 1;
    setCurrentPage(current);
  };

  return (
    <MainLayout title="create task">
      <Steps current={currentPage} style={{ marginBottom: "20px" }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentPage].content}</div>
      <div className="steps-action">
        {currentPage < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              currentPage === 0 && checkInputValues();
              currentPage === 1 && checkMarkdownTextarea();
            }}
          >
            Next
          </Button>
        )}
        {currentPage === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {currentPage > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </MainLayout>
  );
};

export default Create;
