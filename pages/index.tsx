import React, { useState, useEffect } from "react";

import MainLayout from "../components/MainLayout";
import axios from "axios";

const Home: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // TODO: panasiuk use Home.getInitialProps instead of useEffect for SEO
    axios
      .get(`http://localhost:4000/posts`)
      .then((data) => setPosts(data.data));
  }, []);

  const testAxios = () => {
    axios
      .post("http://localhost:4000/posts", {
        id: "your id",
        title: "your tittle",
        body: "your body",
      })
      .then(function (response) {
        console.log("response", response);
      })
      .catch(function (error) {
        console.error("error", error);
      });
  };

  return (
    <>
      <MainLayout title="home page">
        <h1>Home page</h1>
        <ul>
          {posts.map((i) => (
            <li key={i.id}>{i.title}</li>
          ))}
        </ul>
        <button onClick={testAxios}>testAxios</button>
      </MainLayout>
    </>
  );
};

export default Home;
