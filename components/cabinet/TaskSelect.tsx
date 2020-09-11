import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Typography, Select, InputNumber } from "antd";
import { ITaskData } from "../../pages/tasks";

import { CodeOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

interface ITaskSelect {
  title: string;
  selectedTask: string;
  tasks: ITaskData[];
  maxScore: number;
  maxScoreValue: number | null;
  onHandleMaxScoreChange: (value: number) => void;
  onHandleTaskChange: (value: string) => void;
}

const TaskSelect: React.FC<ITaskSelect> = ({
  title,
  selectedTask,
  tasks,
  maxScore,
  maxScoreValue,
  onHandleMaxScoreChange,
  onHandleTaskChange,
}: ITaskSelect) => {
  return (
    <React.Fragment>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      <Select
        value={selectedTask}
        showSearch
        style={{ width: 200 }}
        onChange={onHandleTaskChange}
        placeholder={"Select task"}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {tasks.map((task) => (
          <Option key={uuidv4()} value={task.taskName}>
            <CodeOutlined /> {task.taskName}
          </Option>
        ))}
      </Select>
      <div style={{ marginTop: "20px" }}>
        <h4>What do you think about your score?</h4>
        {maxScore && <h5>Max score: {maxScore}</h5>}
        <InputNumber
          min={1}
          max={maxScore}
          value={maxScoreValue}
          onChange={onHandleMaxScoreChange}
        />
      </div>
    </React.Fragment>
  );
};

export default TaskSelect;
