import React from "react";
import { Spin } from "antd";

const LoadingComponent: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Spin />
    </div>
  );
};

export default LoadingComponent;
