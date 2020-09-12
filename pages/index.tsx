import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import axios from "axios";

import { ITaskData } from "./tasks";
import MainLayout from "../components/layout/MainLayout";
import {
  BranchAndReposContainer,
  Commits,
  PullRequests,
  TaskSelect,
  CheckOutData,
  CabinetButtons,
} from "../components/cabinet/index";

import { Steps, message } from "antd";

const { Step } = Steps;

interface IGetInitialProps {
  login?: string;
  role?: string;
  tasks: Array<ITaskData>;
}

const Home: NextPage<IGetInitialProps> = React.memo(
  ({ login, role, tasks }: IGetInitialProps) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedRepo, setSelectedRepo] = React.useState<string | null>(null);
    const [selectedBranch, setSelectedBranch] = React.useState<string | null>(
      null
    );
    const [selectedTask, setSelectedTask] = React.useState<string | null>(null);
    const [selectedPRUrl, setSelectedPRUrl] = React.useState<string | null>(
      null
    );
    const [maxScoreValue, setMaxScoreValue] = React.useState<number | null>(
      null
    );
    const [selectedPR, setSelectedPR] = React.useState<string | null>(null);
    const [isFailed, setIsFailed] = React.useState<boolean>(false);

    const router = useRouter();

    const pullRequests = useSelector((state) => state.requests.pullRequests);

    const taskWithMaxScore =
      selectedTask && tasks.find((task) => task.taskName === selectedTask);

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
          branch: selectedBranch,
          pullRequest: selectedPRUrl,
          maxScore: maxScoreValue,
        })
        .then(() => {
          message.success("Processing complete!");
          router.push("/tasks");
        });
    };

    const onHandleRepoSelect = (value: string): void => {
      setSelectedBranch(null);
      setSelectedRepo(value);
    };
    const onHandleBranchSelect = (value: string): void => {
      setSelectedBranch(value);
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
    const onHandleMaxScoreChange = (value: number): void => {
      setMaxScoreValue(value);
    };

    const setFailed = (): void => {
      setIsFailed(true);
    };

    const openErrorMessage = (valueToSelect: string): void => {
      message.error(`Please ${valueToSelect}`);
    };

    const checkSelects = (pageID: number): void => {
      if (pageID === 0) {
        !selectedTask ? openErrorMessage("select task") : next();
      } else if (pageID === 1 && !isFailed) {
        !selectedRepo || !selectedBranch
          ? openErrorMessage("select repository and branch")
          : next();
      } else if (pageID === 3 && !isFailed) {
        if (!selectedPRUrl && pullRequests.length !== 0)
          openErrorMessage("select pull request");
        else if (pullRequests.length === 0)
          openErrorMessage("come back and select repository with pull request");
        else next();
      } else if (pageID === 4) {
        !maxScoreValue
          ? openErrorMessage("enter your max score")
          : addCompletedTaskToDB();
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
          <BranchAndReposContainer
            selectedRepo={selectedRepo}
            selectedBranch={selectedBranch}
            onHandleBranchSelect={onHandleBranchSelect}
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
            selectedBranch={selectedBranch}
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
            maxScore={taskWithMaxScore && taskWithMaxScore.maxScore}
            onHandleMaxScoreChange={onHandleMaxScoreChange}
            maxScoreValue={maxScoreValue}
            selectedRepo={selectedRepo}
            selectedBranch={selectedBranch}
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
          {!isFailed && (
            <Steps current={currentPage}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          )}
          <div
            style={{
              margin: isFailed && "0 auto",
            }}
          >
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
            {!isFailed && (
              <CabinetButtons
                checkIsFailedForPrev={checkIsFailedForPrev}
                next={next}
                checkSelects={checkSelects}
                currentPage={currentPage}
                steps={steps}
              />
            )}
          </div>
        </MainLayout>
      </>
    );
  }
);
Home.getInitialProps = async () => {
  const res = await fetch(`http://localhost:4000/tasks`);
  const tasks = await res.json();

  return { tasks };
};

const mapStateToProps = (state) => {
  return { login: state.chooseRole.login, role: state.chooseRole.role };
};

export default connect(mapStateToProps)(Home);
