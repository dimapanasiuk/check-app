import React, { useState } from "react";

import { Modal, DatePicker, Form, Input, InputNumber } from "antd";
import { ITaskData } from "../../pages/tasks";

import moment from "moment";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface IEditModal {
  isVisible: boolean;
  closeEditModal: () => void;
  editTask: (obj: ITaskData) => void;
  taskData: ITaskData;
}

const EditModal: React.FC<IEditModal> = ({
  isVisible,
  closeEditModal,
  editTask,
  taskData,
}: IEditModal) => {
  const [inputNumberValue, setInputNumberValue] = useState<number>(
    taskData.maxScore
  );
  const [taskName, setTaskName] = useState<string>(taskData.taskName);
  const [taskDescription, setTaskDescription] = useState<string>(
    taskData.taskDescription
  );
  const [mdBodyData, setMdBodyData] = useState<string>(taskData.markdown);
  const [date, setDate] = useState<Array<string>>(taskData.date);

  const getDataFromTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const getDataFromMaxScore = (value: number) => {
    setInputNumberValue(value);
  };

  const getDataFromMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMdBodyData(e.target.value);
  };

  const getDataFromTaskDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  const getDataAboutDate = (_, dateString) => {
    setDate(dateString);
  };

  const onOk = () => {
    editTask({
      id: taskData.id,
      taskName: taskName,
      taskDescription: taskDescription,
      maxScore: inputNumberValue,
      markdown: mdBodyData,
      date: date,
    });
  };

  return (
    <>
      <Modal
        visible={isVisible}
        onCancel={closeEditModal}
        onOk={onOk}
        title="Edit"
      >
        <Form name="basic" layout="vertical">
          <Form.Item name={"name"} label="Task Name" initialValue={taskName}>
            <Input onChange={getDataFromTaskName} />
          </Form.Item>
          <Form.Item
            initialValue={taskDescription}
            name={"description"}
            label="Task description"
          >
            <TextArea
              onChange={getDataFromTaskDescription}
              autoSize={true}
              style={{ minHeight: "100px" }}
            />
          </Form.Item>

          <Form.Item
            name={"date"}
            initialValue={[moment(date[0]), moment(date[1])]}
            label="Enter date for start and deadline task"
          >
            <RangePicker
              onChange={getDataAboutDate}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            name={"markdown"}
            initialValue={mdBodyData}
            label="Enter markdown"
          >
            <TextArea
              style={{ minHeight: "50px" }}
              autoSize={true}
              onChange={getDataFromMarkdown}
            />
          </Form.Item>
          <Form.Item
            name={"score"}
            label="Maximum score"
            initialValue={inputNumberValue}
          >
            <InputNumber onChange={getDataFromMaxScore} min={1} max={500} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
