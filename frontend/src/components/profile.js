import React, { useEffect, useState } from "react";
import useToken from "./useToken";
import LoginForm from "./loginForm";
import Posts from "./posts";
import DayJS from "react-dayjs";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../css/profile.css";

const API = "https://instahamjs-backend.onrender.com";
//const API = "http://localhost:4000";

export default function Profile() {
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useToken();

  useEffect(() => {
    if (!token) return <LoginForm setToken={setToken} />;

    async function fetchUser() {
      const res = await fetch(API + "/api/profile", {
        headers: {
          auth: token,
        },
      });
      const json = await res.json();
      setUserData(json);
      setPosts(json.posts);
    }

    fetchUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
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
      <hr />
      <Posts posts={posts} />
    </>
  );
}
