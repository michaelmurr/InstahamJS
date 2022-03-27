import Nav from "./nav";
import "../css/app.css";
import "../css/posts.css";
import Posts from "./posts";
import Profile from "./profile";
import Upload from "./uploadForm";
import useToken from "./useToken";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

const API = "//instahambackend.herokuapp.com";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { token, setToken } = useToken();


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
        <Nav />
        <Routes>
          <Route path="/" exact element={<Posts posts={posts} />} />
          <Route
            path="/login"
            exact
            element={<LoginForm setToken={setToken} />}
          />
          <Route path="/register" exact element={<SignupForm />} />
          <Route path="/api/upload" exact element={<Upload />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}
