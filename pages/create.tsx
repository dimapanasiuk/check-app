import React, { useState } from "react";

import MainLayout from "../components/MainLayout";
import InitialTask from "../components/createTask/InitilTask";
import MarkdownPrew from "../components/createTask/MarkdownPrew";
import CheckTask from "../components/createTask/CheckTask";

import { Steps, Button, message } from "antd";

const { Step } = Steps;

const Create = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [taskName, setTaskName] = useState("error");
  const [mdBodyData, setMdBodyData] = useState("");

  const getDataFromInput = (data: string) => {
    setTaskName(data);
  };

  const getDataFromTextAria = (data: string) => {
    setMdBodyData(data);
  };

  const steps = [
    {
      title: "Initial task",
      content: <InitialTask getDataFoo={getDataFromInput} />,
    },
    {
      title: "Create Markdown page",
      content: <MarkdownPrew getDataFoo={getDataFromTextAria}/>,
    },
    {
      title: "Check data",
      content: <CheckTask rmBody={mdBodyData} taskName={taskName} />,
    },
  ];

  const next = () => {
    const current = currentPage + 1;
    setCurrentPage(current);
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
          <Button type="primary" onClick={() => next()}>
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
