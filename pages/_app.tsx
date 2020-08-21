import React from "react";

import "antd/dist/antd.css";

const MyApp: React.FC = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

export default MyApp;
