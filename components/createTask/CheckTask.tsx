import React, { useState } from "react";
import rdmd from "@readme/markdown";

interface ICheckTask {
  rmBody: string;
  taskName: string;
  maxScore: number;
}

const CheckTask: React.FC<ICheckTask> = ({ rmBody, taskName, maxScore }) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Check Task</h1>
      <h1 style={{ textAlign: "center" }}>Your task name: {taskName}</h1>
      <h1 style={{ textAlign: "center" }}>Your maximum score: {maxScore} </h1>
      {rdmd(rmBody)}
    </>
  );
};

export default CheckTask;
