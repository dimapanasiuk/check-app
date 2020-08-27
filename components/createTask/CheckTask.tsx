import React, { useState } from "react";
import rdmd from "@readme/markdown";

interface ICheckTask {
  rmBody: string;
  taskName: string;
  maxScore: number;
  taskDescription: string;
}

const CheckTask: React.FC<ICheckTask> = ({
  rmBody,
  taskName,
  maxScore,
  taskDescription,
}) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Check Task</h1>
      <h1 style={{ textAlign: "center" }}>Your task name: {taskName}</h1>
      <h1 style={{ textAlign: "center" }}>Your maximum score: {maxScore} </h1>
      {taskDescription && (
        <React.Fragment>
          <h1>Task description:</h1>
          <h1 style={{ textAlign: "center", maxWidth: "800px" }}>
            {taskDescription}
          </h1>
        </React.Fragment>
      )}

      {rdmd(rmBody)}
    </>
  );
};

export default CheckTask;
