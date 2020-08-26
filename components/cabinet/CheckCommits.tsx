import React from "react";
import { uuid } from "uuidv4";

interface ICheckCommit {
  title: string;
}

const CheckCommits: React.FC<ICheckCommit> = ({ title }: ICheckCommit) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};
export default CheckCommits;
