import React from "react";

import MainLayout from "../components/layout/MainLayout";
import YourScore from "../components/score/YourScore";
import AllScore from "../components/score/AllScore";

import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Score = () => (
  <MainLayout title="score page">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="All score" key="1">
        <AllScore />
      </TabPane>
      <TabPane tab="Your score" key="2">
        <YourScore />{" "}
      </TabPane>
    </Tabs>
  </MainLayout>
);

export default Score;
