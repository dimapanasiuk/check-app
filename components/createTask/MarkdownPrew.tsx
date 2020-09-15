import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Row, Col, Input } from "antd";
import CodeBlock from "./CodeBlock";

import styles from "../../styles/Markdown.module.scss";

const { TextArea } = Input;

interface IMarkdownPrew {
  getDataFoo: (data: string) => void;
}

const MarkdownPrew: React.FC<IMarkdownPrew> = ({
  getDataFoo,
}: IMarkdownPrew) => {
  const [rmBody, setRmBody] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRmBody(value);
    getDataFoo(value);
  };

  return (
    <Row gutter={[8, 16]}>
      <Col className={styles.column} span={12}>
        <TextArea
          style={{ minHeight: "66vh" }}
          autoSize={true}
          onChange={changeHandler}
          value={rmBody}
        />
      </Col>
      <Col className={styles.markdown} span={12}>
        <ReactMarkdown source={rmBody} renderers={{ code: CodeBlock }} />
      </Col>
    </Row>
  );
};

export default MarkdownPrew;
