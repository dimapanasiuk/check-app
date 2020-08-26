import React, { useState } from "react";
import rdmd from "@readme/markdown";

interface ICheckTask {
  rmBody: string;
  taskName: string;
}

const CheckTask: React.FC<ICheckTask> = ({ rmBody, taskName }: ICheckTask) => {
  return (
    <>
      <h1>Check Task</h1>
      <h1>Your task name {taskName}</h1>
      {rdmd(rmBody)}
    </>
  );
};

export default CheckTask;
