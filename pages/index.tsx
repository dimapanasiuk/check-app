import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";

import { ITaskData } from "./tasks";
import MainLayout from "../components/layout/MainLayout";
import BrunchAndRepoContainer from "../components/cabinet/BrunchAndRepoContainer";
import Commits from "../components/cabinet/Commits";
import PullRequests from "../components/cabinet/PullRequests";
import TaskSelect from "../components/cabinet/TaskSelect";
import CheckOutData from "../components/cabinet/CheckOutData";
import CabinetButtons from "../components/cabinet/CabinetButtons";

import { Steps, message } from "antd";

const { Step } = Steps;

interface IGetInitialProps {
  login?: string;
  role?: string;
  tasks: Array<ITaskData>;
}

const Home: NextPage<IGetInitialProps> = ({
  login,
  role,
  tasks,
}: IGetInitialProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedRepo, setSelectedRepo] = React.useState<string | null>(null);
  const [selectedBrunch, setSelectedBrunch] = React.useState<string | null>(
    null
  );
  const [selectedTask, setSelectedTask] = React.useState<string | null>(null);
  const [selectedPRUrl, setSelectedPRUrl] = React.useState<string | null>(null);
  const [selectedPR, setSelectedPR] = React.useState<string | null>(null);
  const [isFailed, setIsFailed] = React.useState<boolean>(false);

  const router = useRouter();

  const pullRequests = useSelector((state) => state.requests.pullRequests);

  useEffect(() => {
    if (login === "") {
      router.push("/login");
    }
  }, [login, router]);

  const addCompletedTaskToDB = async () => {
    await axios
      .post("http://localhost:4000/completedTasks", {
        user: login,
        role: role,
        taskName: selectedTask,
        repository: selectedRepo,
        branch: selectedBrunch,
        pullRequest: selectedPRUrl,
      })
      .then(() => {
        router.push("/tasks");
      });
  };

  const onHandleRepoSelect = (value: string): void => {
    setSelectedBrunch(null);
    setSelectedRepo(value);
  };
  const onHandleBrunchSelect = (value: string): void => {
    setSelectedBrunch(value);
  };
  const onHandleTaskSelect = (value: string): void => {
    setSelectedTask(value);
  };
  const onHandlePRSelect = (value: string): void => {
    setSelectedPR(value);
  };
  const onHandlePRUrlChange = (value: string): void => {
    setSelectedPRUrl(value);
  };

  const setFailed = (): void => {
    setIsFailed(true);
  };

  const openErrorMessage = (valueToSelect: string): void => {
    message.error(`Please ${valueToSelect}`);
  };

  const checkSelects = (pageID: string): void => {
    if (pageID === "tasks") {
      selectedTask === null ? openErrorMessage("select task") : next();
    } else if (pageID === "repos" && !isFailed) {
      selectedRepo === null || selectedBrunch === null
        ? openErrorMessage("select repository and brunch")
        : next();
    } else if (pageID === "PR" && !isFailed) {
      if (selectedPRUrl === null && pullRequests.length !== 0)
        openErrorMessage("select pull request");
      else if (pullRequests.length === 0)
        openErrorMessage("come back and select repository with pull request");
      else next();
    } else if (isFailed) {
      openErrorMessage("refresh the page");
    } else next();
  };

  const checkIsFailedForPrev = (): void => {
    !isFailed ? prev() : openErrorMessage("refresh the page");
  };

  const steps = [
    {
      title: "Choose Task",
      content: (
        <TaskSelect
          tasks={tasks}
          selectedTask={selectedTask}
          onHandleTaskChange={onHandleTaskSelect}
          title={"Choose task you want mentors to check"}
        />
      ),
    },
    {
      title: "Choose Repository",
      content: (
        <BrunchAndRepoContainer
          selectedRepo={selectedRepo}
          selectedBrunch={selectedBrunch}
          onHandleBrunchSelect={onHandleBrunchSelect}
          onHandleRepoSelect={onHandleRepoSelect}
          setFailed={setFailed}
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
      content: (
        <PullRequests
          selectedPR={selectedPR}
          onHandlePRSelect={onHandlePRSelect}
          onHandlePRUrlChange={onHandlePRUrlChange}
          selectedRepo={selectedRepo}
          login={login}
          setFailed={setFailed}
          title="Choose your pull request"
        />
      ),
    },
    {
      title: "Check out data",
      content: (
        <CheckOutData
          title="Check out your data"
          selectedRepo={selectedRepo}
          selectedBrunch={selectedBrunch}
          selectedTask={selectedTask}
          selectedPRUrl={selectedPRUrl}
        />
      ),
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
        {currentPage === 2 && (
          <CabinetButtons
            checkIsFailedForPrev={checkIsFailedForPrev}
            next={next}
            checkSelects={checkSelects}
            currentPage={currentPage}
            steps={steps}
          />
        )}
        <div className="steps-content">{steps[currentPage].content}</div>
        <CabinetButtons
          addCompletedTaskToDB={addCompletedTaskToDB}
          checkIsFailedForPrev={checkIsFailedForPrev}
          next={next}
          checkSelects={checkSelects}
          currentPage={currentPage}
          steps={steps}
        />
      </MainLayout>
    </>
  );
};
Home.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const tasks = await res.json();

  return { tasks };
};

const mapStateToProps = (state) => {
  return { login: state.chooseRole.login, role: state.chooseRole.role };
};

export default connect(mapStateToProps)(Home);
