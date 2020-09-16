import React from "react";
import Link from "next/link";
import { Result, Button } from "antd";

const ErrorPage404: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link href="/">
            <a>Back Home</a>
          </Link>
        </Button>
      }
    />
  );
};

export default ErrorPage404;
