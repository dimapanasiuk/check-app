import React from "react";

import 'antd/dist/antd.css';

const MyApp: React.FC = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
