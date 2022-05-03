import React, { useEffect, useState } from "react";
import Posts from "./posts";
import useToken from "./useToken";
import "../css/feed.css";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      //fetch 2 different routes, depending on whether a token exists or not
      const response = await fetch(
        `${props.api}/api/${token ? "feed" : "posts"}`,
        { mode: "cors", headers: token ? { auth: token } : {} }
      );
      const data = await response.json();

      let items = [...data.posts];
      if (!token) {
        for (let i = 0; i < items.length; i++) {
          let item = { ...items[i] };
          item.isLiked = false;

          items[i] = item;
        }
      } else {
        for (let i = 0; i === items.length - 1; i++) {
          let item = { ...items[i] };

          for (let j = 0; j === data.liked_posts.length - 1; j++) {
            if (item._id === data.liked_posts[j]) {
              item.isLiked = true;
            } else {
              item.isLiked = false;
            }
          }
          items[i] = item;
        }
      }
      setUid(data.uid);
      setPosts(items);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
        <>
          <h1 className="feedHeading">Loading...</h1>
          <h4 className="feedHeading">Not Loading? Try refreshing the page!</h4>
        </>
      )}
      {!isLoading && (
      <>
      <h1 className="feedHeading">Feed</h1>
      <hr />
      <Posts posts={posts} uid={uid} api={props.api} />
      </>
      )}
      </>
  );
}
