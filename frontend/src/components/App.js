import "../css/app.css";
import "../css/posts.css";
import Posts from "./posts";
import Upload from "./uploadForm";
import Nav from "./nav";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useToken from "./useToken";
import DayJS from "react-dayjs";
import heart_icon from "../heart_icon.png";

import SignupForm from "./signupForm";
import LoginForm from "./loginForm";

const API = "//instahambackend.herokuapp.com";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  //const [date, setDate] = useState("");
  const { token, setToken } = useToken();

  async function fetchData() {}

  useEffect(() => {
    async function fetchData() {
      if (loading === true) {
        const response = await fetch(API + "/api/posts", { mode: "cors" });
        const data = await response.json();
        setLoading(false);
        setPosts(data.posts);
       // setDate();
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <header>
        <Nav />
        </header>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <div className="fetchedPosts">
                {posts.map((post) => (
                  <div
                    key={post.ownerID}
                    id={post.ownerID}
                    className="postContainer"
                  >
                    <h1 className="username">{post.username}</h1>
                    <div className="postDate">
                      <DayJS format="DD. MMMM YYYY, H:mm">
                        {post.uploadDate}
                      </DayJS>
                    </div>
                    <p>{post.content}</p>
                    <div><img src={heart_icon} alt=""/> {post.likes}</div>
                  </div>
                ))}
              </div>
            }
          />
          <Route
            path="/login"
            exact
            element={<LoginForm setToken={setToken} />}
          />
          <Route path="/register" exact element={<SignupForm />} />
          <Route path="/api/upload" exact element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
}
