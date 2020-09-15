import React from "react";

interface IYourScore {
  tasks: Array<any>;
  completedTasks: Array<any>;
  users: Array<any>;
}

const YourScore: React.FC<IYourScore> = ({
  tasks,
  completedTasks,
  users,
}: IYourScore) => {

  return <h1>Your score</h1>;
};

export default YourScore;
