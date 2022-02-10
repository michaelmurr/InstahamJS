import "../css/app.css";
import "../css/posts.css";
import Posts from "./posts";
import Upload from "./uploadForm";
import Nav from "./nav";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignupForm from "./signupForm";
import LoginForm from "./loginForm";

const API = "//instahambackend.herokuapp.com";

function App() {
let postArray = [];

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(postArray);

  useEffect(async () => {
    const response = await fetch(API + "/api/posts");
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  });

    return (
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Posts posts={posts} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/api/upload" element={<Upload />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;
