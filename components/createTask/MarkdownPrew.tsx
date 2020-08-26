import React, { useState } from "react";
import rdmd from "@readme/markdown";

import { Row, Col, Input } from "antd";

const { TextArea } = Input;

interface IMarkdownPrew {
  getDataFoo: any;
}
const MarkdownPrew: React.FC<IMarkdownPrew> = ({
  getDataFoo,
}: IMarkdownPrew) => {
  const [rmBody, setRmBody] = useState("# write your markdown");

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRmBody(value);
    getDataFoo(value);
  };

  return (
    <Row gutter={[8, 16]}>
      <Col span={12}>
        <TextArea rows={4} onChange={changeHandler} value={rmBody} />
      </Col>
      <Col span={12}>{rdmd(rmBody)}</Col>
    </Row>
  );
};

export default MarkdownPrew;
