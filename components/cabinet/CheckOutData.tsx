import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface ICheckOutData {
  title: string;
  selectedRepo: string;
  selectedTask: string;
  selectedBrunch: string;
  selectedPRUrl: string;
  maxScoreValue: number;
}

const CheckOutData: React.FC<ICheckOutData> = ({
  title,
  selectedBrunch,
  selectedRepo,
  selectedTask,
  selectedPRUrl,
  maxScoreValue
}: ICheckOutData) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      <h3>Your task: {selectedTask} </h3>
      <h3>Your repository: {selectedRepo} </h3>
      <h3>Your brunch: {selectedBrunch} </h3>
      <h3>Your max score: {maxScoreValue}</h3>
      {selectedPRUrl && (
        <h3>
          Your pull request: <a href={selectedPRUrl}>{selectedPRUrl}</a>
        </h3>
      )}
    </div>
  );
};
export default CheckOutData;
