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

import SignupForm from "./signupForm";
import LoginForm from "./loginForm";

const API = "http://localhost:4000";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState("");
  const { token, setToken } = useToken();

  async function fetchData() {}

  useEffect(() => {
    async function fetchData() {
      if (loading === true) {
        const response = await fetch(API + "/api/posts", { mode: "cors" });
        const data = await response.json();
        setLoading(false);
        setPosts(data.posts);
        setDate();
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Nav />
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
                    <div>{post.username}</div>
                    <div>{post.content}</div>
                    <div>
                      <DayJS format="DD. MMMM YYYY, H:mm">
                        {post.uploadDate}
                      </DayJS>
                    </div>
                    <div>Likes: {post.likes}</div>
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
