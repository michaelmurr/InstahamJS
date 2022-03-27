import React, { useEffect, useState } from "react";
import useToken from "./useToken";
import LoginForm from "./loginForm";
import Posts from "./posts";
import DayJS from "react-dayjs";

//const API = "//instahambackend.netlify.app";
const API = "http://localhost:4000";

export default function Profile() {
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (loading === true) {
        const res = await fetch(API + "/api/profile", {
          headers: {
            auth: token,
          },
        });
        const json = await res.json();
        setLoading(false);
        setUserData(json);
        setPosts(json.posts);
      }
    }
    fetchUser();
  }, []);

  if (!token) return <LoginForm setToken={setToken} />;

  return (
    <div className="profileWrapper">
      <h1>{userData.username}</h1>
      <h3>
        joined on {" "}
        <DayJS format="DD. MMMM YYYY, H:mm">{userData.date_joined}</DayJS>
      </h3>

      <Posts posts={posts} />
    </div>
  );
}
