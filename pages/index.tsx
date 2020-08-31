import React, { useState } from "react";
import { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout";
import Chooser from "../components/cabinet/ChooseRepo";
import CheckCommits from "../components/cabinet/CheckCommits";
import ChoosePR from "../components/cabinet/ChoosePr";

import { Steps, Button, message } from "antd";

const { Step } = Steps;

const Home: NextPage = () => {
  const steps = [
    {
      title: "Choose Repository",
      content: <Chooser title="Choose Repository and branch you worked with" />,
    },
    {
      title: "Check out your commits",
      content: <CheckCommits title="Check out commits" />,
    },
    {
      title: "Choose PR",
      content: <ChoosePR title="Choose your pull request" />,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const next = () => {
    const current = currentPage + 1;
    setCurrentPage(current);
  };

  const prev = () => {
    const current = currentPage - 1;
    setCurrentPage(current);
  };

  return (
    <>
      <MainLayout title="home page">
        <Steps current={currentPage}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[currentPage].content}</div>
        <div className="steps-action" style={{ marginTop: "20px" }}>
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
    </>
  );
};

export default Home;
