import React, { useEffect, useState } from "react";
import Posts from "./posts";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API = "https://instahamjs-backend.onrender.com"
  //const API = "http://localhost:4000";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API + "/api/posts", { mode: "cors" });
      const data = await response.json();
      setPosts(data.posts);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {posts && <Posts posts={posts} />}
    </>
  );
}
