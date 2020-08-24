import React, { useState, useEffect } from "react";
import axios from "axios";

import MainLayout from "../../components/MainLayout";

import { Typography } from "antd";

const { Title } = Typography;

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // TODO: panasiuk use Home.getInitialProps instead of useEffect for SEO
    axios
      .get(`http://localhost:4000/tasks`)
      .then((data) => setTasks(data.data));
  }, []);
  return (
    <MainLayout title="tasks">
      <Title level={2}>Your task</Title>
      <ul>
        {tasks.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </MainLayout>
  );
};

export default Tasks;
