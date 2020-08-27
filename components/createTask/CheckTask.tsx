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
      <div style={{ textAlign: "center" }}>
        <h1>Check Task</h1>
        <h1>Your task name: {taskName}</h1>
        <h1>Your maximum score: {maxScore} </h1>
        {taskDescription && (
          <React.Fragment>
            <h1>Task description:</h1>
            <h1 style={{ margin: "0 auto", maxWidth: "1000px" }}>
              {taskDescription}
            </h1>
          </React.Fragment>
        )}

        {rdmd(rmBody)}
      </div>
    </>
  );
};

export default CheckTask;
