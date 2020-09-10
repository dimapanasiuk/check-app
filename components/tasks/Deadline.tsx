import React from "react";

import { Typography, Space } from "antd";
const { Text } = Typography;

interface IDeadline {
  start: string;
  end: string;
}

const Deadline: React.FC<IDeadline> = ({ start, end }: IDeadline) => {
  return (
    <>
      <Space direction="vertical">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>Task start</Text>
          <Text keyboard>{start}</Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>Task end</Text>
          <Text keyboard>{end}</Text>
        </div>
      </Space>
    </>
  );
};

export default Deadline;
