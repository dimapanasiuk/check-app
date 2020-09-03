import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import MainLayout from "../components/layout/MainLayout";

import { Steps, Button, message } from "antd";

import BrunchAndRepoContainer from "../components/cabinet/BrunchAndRepoContainer";
import Commits from "../components/cabinet/Commits";
import PullRequests from "../components/cabinet/PullRequests";

const { Step } = Steps;

interface IHome {
  login: string;
}

const Home: NextPage<IHome> = ({ login }: IHome) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedRepo, setSelectedRepo] = React.useState<string | null>(null);
  const [selectedBrunch, setSelectedBrunch] = React.useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (login === "") {
      router.push("/login");
    }
  }, []);

  const onHandleRepoSelect = (value: string): void => {
    setSelectedBrunch(null);
    setSelectedRepo(value);
  };
  const onHandleBrunchSelect = (value: string): void => {
    setSelectedBrunch(value);
  };

  const steps = [
    {
      title: "Choose Repository",
      content: (
        <BrunchAndRepoContainer
          selectedRepo={selectedRepo}
          selectedBrunch={selectedBrunch}
          onHandleBrunchSelect={onHandleBrunchSelect}
          onHandleRepoSelect={onHandleRepoSelect}
          login={login}
          title="Choose Repository and branch you worked with"
        />
      ),
    },
    {
      title: "Check out your commits",
      content: (
        <Commits
          selectedBrunch={selectedBrunch}
          selectedRepo={selectedRepo}
          login={login}
          title="Check out commits"
        />
      ),
    },
    {
      title: "Choose PR",
      content: <PullRequests title="Choose your pull request" />,
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

const mapStateToProps = (state) => {
  return { login: state.chooseRole.login };
};

export default connect(mapStateToProps)(Home);
