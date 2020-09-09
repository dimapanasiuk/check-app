import React from "react";

import styles from "../../styles/Performance.module.scss";

import { Progress, Typography } from "antd";
const { Title } = Typography;

const Performance: React.FC = () => {
  return (
    <>
      <div className={styles.layout}>
        <div>
          <Progress type="circle" percent={30} width={80} />
          <Title level={4}>Check-app</Title>
        </div>
        <div>
          <Progress type="circle" percent={80} width={80} />
          <Title level={4}>Songbird</Title>
        </div>
      </div>
    </>
  );
};

export default Performance;
