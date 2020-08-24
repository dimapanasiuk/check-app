import React from "react";
import { uuid } from "uuidv4";

interface ICheckCommit {
  title: string;
  arr: Array<any>
}

const CheckCommits: React.FC<ICheckCommit> = ({ title, arr }: ICheckCommit) => {
    return (
        <>
        <h1>{title}</h1>
    {arr.reverse().map(i => <h1 key={uuid()}>{i.commit.message}</h1>)}
        </>
    )
}
;

export default CheckCommits;
