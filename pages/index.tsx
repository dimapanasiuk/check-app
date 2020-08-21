import Head from "next/head";

import { MainLayout } from "../components/MainLayout";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <h1>check app</h1>
      </MainLayout>
    </>
  );
};

export default Home;
