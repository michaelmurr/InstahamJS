import React, { useEffect, useState } from "react";
import Posts from "./posts";
import useToken from "./useToken";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useToken();

  const API = "https://instahamjs-backend.onrender.com"
  //const API = "http://localhost:4000";

  useEffect(() => {
    async function fetchData() {
      let url = "";
      let options = {};

      if (!token) {
        url = API + "/api/posts";
        options = { mode: "cors" };
      } else {
        url = API + "/api/feed";
        options = {
          mode: "cors",
          headers: {
            auth: token,
          },
        };
      }

      const response = await fetch(url, options);
      const data = await response.json();
      let items = [...data.posts];

      if (!token) {
        for (let i = 0; i < items.length; i++) {
          let item = { ...items[i] };
          item.isLiked = false;

          items[i] = item;
        }
      }
      setPosts(items);
      setLikedPosts(data.liked_posts);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function handleLike(likedPost, param_posts) {
    let items = [...param_posts];
    for (let i = 0; i < items.length; i++) {
      if (param_posts[i]._id === likedPost._id) {
        let item = { ...items[i] };
        console.log(item._id);

        if (item.isLiked) {
          console.log(1);
          item.likes--;
          item.isLiked = false;
          fetch(API + "/api/remove_like/" + item._id, {
            method: "patch",
            mode: "cors"
          });
        } else if (!item.isLiked || item.isLiked == null) {
          console.log(2);
          item.likes++;
          item.isLiked = true;

          fetch(API + "/api/like/" + item._id, {
            method: "patch",
            mode: "cors"

          });
        }

        items[i] = item;
        console.log(item);
        return items;
      }
    }
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && <Posts posts={posts} handleLike={handleLike} />}
    </>
  );
}
