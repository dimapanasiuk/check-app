import React from "react";

const MyApp: React.FC = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
