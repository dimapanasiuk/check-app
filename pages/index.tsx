import React, { useState } from "react";
import { NextPage } from "next";

import MainLayout from "../components/MainLayout";
import Chooser from "../components/cabinet/ChooseRepo";
import CheckCommits from "../components/cabinet/CheckCommits";

import { Steps, Button, message } from "antd";

const { Step } = Steps;


interface IHome {
  repositories: Array<any>;
  branches: Array<any>;
  commits: Array<any>;
}

const Home: NextPage<IHome> = ({
  repositories = [{ name: "nothing", id: 1123234 }],
  branches,
  commits,
}: IHome) => {
  const steps = [
    {
      title: "Choose Repository",
      content: <Chooser title="Choose Repository" />,
    },
    {
      title: "Choose Branch",
      content: <Chooser title="Choose Branch" />,
    },
    {
      title: "Check commits",
      content: <CheckCommits  title="Check commits" />,
    },
    {
      title: "Choose PR",
      content: <Chooser title="Choose PR" />,
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
    </>
  );
};

export default Home;
