import React from "react";

import MainLayout from "../components/layout/MainLayout";
import Performance from "../components/dashboard/Performance";

import styles from "../styles/dashboard.module.scss";

import { Card } from "antd";

const Dashboard: React.FC = () => {
  return (
    <>
      <MainLayout title="dashboard page">
        <div className={styles.layout}>
          <Card title="Performance" bordered={false} style={{ maxWidth: 500 }}>
            <Performance />
          </Card>
          <Card title="Statistics" bordered={false} style={{ maxWidth: 500 }}>
            <p>Card content</p>
          </Card>
          <Card
            title="Tasks deadline"
            bordered={false}
            style={{ maxWidth: 500 }}
          >
            <p>Card content</p>
          </Card>
        </div>
      </MainLayout>
    </>
  );
};

export default Dashboard;
