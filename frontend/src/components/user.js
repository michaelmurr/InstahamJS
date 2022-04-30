import React, { useEffect, useState } from "react";
import DayJS from "react-dayjs";
import { useParams } from "react-router-dom";
import Posts from "./posts";
import useToken from "./useToken.js";

export default function User(props) {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const { token } = useToken();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch(`${props.api}/api/users/${id}`);
    const json = await res.json();
    setUserData(json);
  };

  function handleLike(likedPost, param_posts) {
    let items = [...param_posts];
    for (let i = 0; i < items.length; i++) {
      if (param_posts[i]._id === likedPost._id) {
        let item = { ...items[i] };

        if (item.isLiked) {
          item.likes--;
          item.isLiked = false;

          fetch(props.api + "/api/remove_like/" + item._id, {
            method: "PATCH",
            headers: {
              auth: token,
            },
          });
        } else if (!item.isLiked || item.isLiked == null) {
          item.likes++;
          item.isLiked = true;

          fetch(props.api + "/api/like/" + item._id, {
            method: "PATCH",
            headers: {
              auth: token,
            },
          });
        }

        items[i] = item;
        return items;
      }
    }
  }

  return (
    <>
    {userData === undefined && <h1>Loading...</h1>}
      {userData !== undefined && (
        <div>
          <div className="profileWrapper">
            <h1 className="heading">Your Profile</h1>
            <h2 className="username">@{userData.username}</h2>
            <p className="joinDate">
              joined on{" "}
              <DayJS format="DD. MMMM YYYY, H:mm">{userData.date_joined}</DayJS>
            </p>
          </div>
          <hr />
          {console.log(userData.posts)}
          <Posts
            posts={userData.posts}
            uid={userData._id}
            handleLike={handleLike}
          />
        </div>
      )}
    </>
  );
}
