import React, { useEffect, useState } from "react";
import useToken from "./useToken";
import LoginForm from "./loginForm";
import Posts from "./posts";
import DayJS from "react-dayjs";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const API = "//instahambackend.netlify.app";
//const API = "http://localhost:4000";

async function fetchUser(auth_token) {
  const res = await fetch(API + "/api/profile", {
    headers: {
      "auth": auth_token,
    },
  });
  const json = await res.json();
  return json;
}

export default function Profile() {
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  
  useEffect(() => {

    if (!token) return <LoginForm setToken={setToken}/>;

    let isMounted = true;

    fetchUser(token)
    .then((data) => {
      if (isMounted) {
        setUserData(data);
        setPosts(data.posts);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="profileWrapper">
      <h1>{userData.username}</h1>
      <h3>
        joined on{" "}
        <DayJS format="DD. MMMM YYYY, H:mm">{userData.date_joined}</DayJS>
      </h3>
      <Link to="/login">
        <Button onClick={logOut}>Log out</Button>
      </Link>

      <Posts posts={posts} />
    </div>
  );
}
