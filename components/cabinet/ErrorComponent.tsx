import React from "react";

import { Result } from "antd";

const ErrorComponent: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Result
        status="error"
        title="Oops, something went wrong."
        subTitle="Please refresh the page"
      />
    </div>
  );
};

export default ErrorComponent;
