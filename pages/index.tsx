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
      content: <Chooser arr={repositories} title="Choose Repository" />,
    },
    {
      title: "Choose Branch",
      content: <Chooser arr={branches} title="Choose Branch" />,
    },
    {
      title: "Check commits",
      content: <CheckCommits arr={commits} title="Check commits" />,
    },
    {
      title: "Choose PR",
      content: <Chooser arr={repositories} title="Choose PR" />,
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

Home.getInitialProps = async () => {
  //get all repos
  // const resRepositories = await fetch(
  //   `https://api.github.com/users/dimapanasiuk/repos`
  // );
  // const jsonRepositories = await resRepositories.json();

  //get all branches
  // const resBranches = await fetch(
  //   `https://api.github.com/repos/dimapanasiuk/todoTS/branches`
  // );
  // const jsonBranches = await resBranches.json();

  //get all commits work not good
  // const resCommits = await fetch(
  //   `https://api.github.com/repos/dimapanasiuk/todoTS/commits/master`
  // );
  // const jsonCommits = await resCommits.json();

  //https://api.github.com/repos/dimapanasiuk/todoTS/branches/master one branches and information about this branch

  return {
    repositories: [{ name: "jsonRepositories" }],
    branches: [{ name: "jsonBranches" }],
    commits: ["jsonCommits"],
  };
};

export default Home;
