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

  function handlePosts() {
    let test = ["624830bcb3631818f4f4e684", "62483051b3631818f4f4e676"];
    let items = [...posts];

    for (let i = 0; i <= items.length; i++) {
      let item = { ...items[i] };
      for (let j = 0; j <= test; j++) {
        item._id === test[j]
        ? (item[i].isLiked = true)
          : (item[i].isLiked = false);
          items[i] = item;
        }
    }
    setPosts(items);
  }

  function handleLike(likedPost, param_posts) {
    let items = [...param_posts];


    for (let i = 0; i < items.length; i++) {
      if (param_posts[i]._id === likedPost._id) {
        let item = { ...items[i] };
        
        if(item.isLiked){
          item.likes--;
          item.isLiked = false;
        }else if (item.isLiked === false){
          item.likes++;
          item.isLiked = true;
        }

        items[i] = item;
        console.log(items);
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
