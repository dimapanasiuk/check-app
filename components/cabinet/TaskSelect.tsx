import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Select } from "antd";
import { Typography } from "antd";
import { ITaskData } from "../../pages/tasks";

const { Title } = Typography;
const { Option } = Select;

interface ITaskSelect {
  title: string;
  selectedTask: string;
  tasks: ITaskData[];
  onHandleTaskChange: (value: string) => void;
}

const TaskSelect: React.FC<ITaskSelect> = ({
  title,
  selectedTask,
  tasks,
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
            {task.taskName}
          </Option>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default TaskSelect;
