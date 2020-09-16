import React, { useState } from "react";

import { Modal, DatePicker, Form, Input, InputNumber } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface IEditModal {
  isVisible: boolean;
  closeEditModal: () => void;
}

const EditModal: React.FC<IEditModal> = ({
  isVisible,
  closeEditModal,
}: IEditModal) => {
  const [inputNumberValue, setInputNumberValue] = useState<number | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [mdBodyData, setMdBodyData] = useState<string>("");
  const [date, setDate] = useState([]);

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

  const getDataAboutDate = (data) => {
    setDate(data);
  };

  return (
    <>
      <Modal visible={isVisible} onCancel={closeEditModal} title="Edit">
        <Form name="basic" layout="vertical">
          <Form.Item
            name={"name"}
            label="Task Name"
            initialValue={taskName}
            rules={[
              {
                required: true,
                message: "Please input task name!",
              },
            ]}
          >
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
            label="Enter date for start and deadline task"
            rules={[
              {
                required: true,
                message: "Please enter date",
              },
            ]}
          >
            <RangePicker
              onChange={getDataAboutDate}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item
            name={"score"}
            label="Maximum score"
            initialValue={inputNumberValue}
            rules={[
              {
                required: true,
                message: "Please input score!",
              },
            ]}
          >
            <InputNumber onChange={getDataFromMaxScore} min={1} max={500} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
