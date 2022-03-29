import React, { useEffect, useState } from "react";
import Posts from "./posts";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);

  //const API = "https://instahamjs-backend.onrender.com"
  const API = "http://localhost:4000";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API + "/api/posts", { mode: "cors" });
      const data = await response.json();
      setPosts(data.posts);
    }
    fetchData();
  }, []);

  return <Posts posts={posts} />;
}
