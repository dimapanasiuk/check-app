import React from "react";

import { Progress, Typography } from "antd";

const { Text } = Typography;

interface IPerformance {
  maxScore: number;
}

const Performance: React.FC<IPerformance> = ({ maxScore }: IPerformance) => {
  const STR = "pt";
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div>
          <Text style={{ paddingRight: "10px" }} strong>
            Your score
          </Text>
          <Text mark>0 {STR}</Text>
        </div>
        <div style={{marginBottom: '20px'}}>
          <Text style={{ paddingRight: "10px" }} strong>
            Max score
          </Text>
          <Text mark>
            {maxScore} {STR}
          </Text>
        </div>
        <Progress percent={30} />
      </div>
    </>
  );
};

export default Performance;
