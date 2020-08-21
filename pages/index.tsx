import React, { useState } from "react";

import MainLayout from "../components/MainLayout";

const Home: React.FC = ({ postsData }) => {
  const [posts, setPosts] = useState([]);
  return (
    <>
      <MainLayout title="test">
        <h1>check app</h1>
        <ul>
          {postsData.map((i) => (
            <li key={i.id}>{i.title}</li>
          ))}
        </ul>
      </MainLayout>
    </>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:4000/posts");
  const json = await res.json();
  return { postsData: json };
};

export default Home;
