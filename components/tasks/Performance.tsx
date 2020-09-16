import React from "react";
import { connect } from "react-redux";

import { Progress, Typography } from "antd";

const { Text } = Typography;

interface IPerformance {
  maxScore: number;
  completed: Array<any>;
  login: string;
  taskName: string;
}

const Performance: React.FC<IPerformance> = ({
  maxScore,
  completed,
  login,
  taskName,
}: IPerformance) => {
  const score = (name, arr, taskName) => {
    if (arr.length > 0 && name !== "") {
      const data = arr.filter(
        (i) => i.user === name && i.taskName === taskName
      );
      if (data.length > 0) {
        return data[data.length - 1].yourScore;
      }
      return 0;
    } else {
      return 0;
    }
  };

  const STR = "pt";

  const yourScore = score(login, completed, taskName);

  const calcPercent = (yourScore, maxScore) => {
    const percent = (yourScore * 100) / maxScore;
    return percent.toFixed(1);
  };

  const yourPercent = calcPercent(yourScore, maxScore);

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div>
          <Text style={{ paddingRight: "10px" }} strong>
            Your score
          </Text>
          <Text mark>
            {yourScore} {STR}
          </Text>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Text style={{ paddingRight: "10px" }} strong>
            Max score
          </Text>
          <Text mark>
            {maxScore} {STR}
          </Text>
        </div>
        <Progress percent={+yourPercent} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({ login: state.chooseRole.login });

export default connect(mapStateToProps)(Performance);
