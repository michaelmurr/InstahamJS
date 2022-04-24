import React, { useEffect, useState } from "react";
import useToken from "./useToken";
import LoginForm from "./loginForm";
import Posts from "./posts";
import DayJS from "react-dayjs";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/profile.css";


const API = "https://instahamjs-backend.onrender.com";
//const API = "http://localhost:4000";

export default function Profile() {
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(API + "/api/profile", {
      headers: {
        auth: token,
      },
    });
    const json = await res.json();
    setUserData(json);
    setPosts(json.posts);
    setIsLoading(false);
  }

  async function deletePost(clickedPostId) {
    await fetch(API + "/api/del_post/" + clickedPostId, {
      method: "DELETE",
      headers: {
        auth: token,
      },
    });
    fetchUser();
  }

  function handleLike(likedPost, param_posts) {
    let items = [...param_posts];
    for (let i = 0; i < items.length; i++) {
      if (param_posts[i]._id === likedPost._id) {
        let item = { ...items[i] };

        if (item.isLiked) {
          item.likes--;
          item.isLiked = false;

          fetch(API + "/api/remove_like/" + item._id, {
            method: "PATCH",
            headers: {
              auth: token,
            },
          });
        } else if (!item.isLiked || item.isLiked == null) {
          item.likes++;
          item.isLiked = true;

          fetch(API + "/api/like/" + item._id, {
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

async function deleteUser(){
  const res = await fetch(API + "/api/deleteAccount", {
    method:"delete",
    headers:{
      auth:token,
    }
  });
  if(res.status === 200) return logOut();
}

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {!token && <LoginForm setToken={setToken} />}
      {isLoading && token && <h1>Loading....</h1>}
      {posts && userData && (
        <div>
          <div className="profileWrapper">
            <h1 className="heading">Your Profile</h1>
            <h2 className="username">@{userData.username}</h2>
            <p className="joinDate">
              joined on{" "}
              <DayJS format="DD. MMMM YYYY, H:mm">{userData.date_joined}</DayJS>
            </p>
            <Link to="/login">
              <Button onClick={logOut}>Log out</Button>
            </Link>
          </div>
          <DropdownButton id="dropdown-basic-button" title="">
              <Dropdown.Item
                onClick={() => {
                  deleteUser();
                }}
              >
                Delete Account
              </Dropdown.Item>
            </DropdownButton>
          <hr />
          <Posts
            posts={posts}
            uid={userData._id}
            deletePost={deletePost}
            handleLike={handleLike}
          />
        </div>
      )}
    </>
  );
}
