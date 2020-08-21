import React, { useState, useEffect } from "react";
import axios from "axios";

import MainLayout from "../components/MainLayout";

const Home: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // TODO: panasiuk use Home.getInitialProps instead of useEffect for SEO
    axios
      .get(`http://localhost:4000/posts`)
      .then((data) => setPosts(data.data));
  }, []);

  const testAxios: void = ()  => {
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
        console.log("error", error);
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
