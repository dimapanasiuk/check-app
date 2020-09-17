import React from "react";
import { Typography, InputNumber } from "antd";

const { Title } = Typography;

interface ICheckOutData {
  title: string;
  selectedRepo: string;
  selectedTask: string;
  selectedBranch: string;
  selectedPRUrl: string;
  maxScoreValue: number;
  maxScore: number;
  onHandleMaxScoreChange: (value: number) => void;
}

const CheckOutData: React.FC<ICheckOutData> = ({
  title,
  selectedBranch,
  selectedRepo,
  selectedTask,
  selectedPRUrl,
  maxScoreValue,
  maxScore,
  onHandleMaxScoreChange,
}: ICheckOutData) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      <h3>Your task: {selectedTask} </h3>
      <h3>Your repository: {selectedRepo} </h3>
      <h3>Your branch: {selectedBranch} </h3>
      {selectedPRUrl && (
        <h3>
          Your pull request: <a href={selectedPRUrl}>{selectedPRUrl}</a>
        </h3>
      )}
      <div style={{ marginTop: "20px" }}>
        <h4>please enter your self check score</h4>
        {maxScore && <h5>Max score: {maxScore}</h5>}
        <InputNumber
          min={1}
          value={maxScoreValue}
          onChange={onHandleMaxScoreChange}
        />
      </div>
    </div>
  );
};
export default CheckOutData;
