import Head from "next/head";

import { Button } from "antd";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>check app</h1>
      <Button type="primary">Button</Button>
    </>
  );
};

export default Home;
