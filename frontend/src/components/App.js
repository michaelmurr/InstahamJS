import "../css/app.css";
import "../css/posts.css";
import Posts from "./posts";
import Upload from "./uploadForm";
import Nav from "./nav";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useToken from "./useToken";

import SignupForm from "./signupForm";
import LoginForm from "./loginForm";

const API = "//instahambackend.herokuapp.com";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState();

  const {token, setToken} = useToken();
  /*
  useEffect(() => {
    async function fetchData(){
      const response = await fetch(API + "/api/posts");
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    }
    fetchData();
  });*/
  
  if(!token) return <Router><LoginForm setToken={setToken}/></Router>

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<h1>Renders on "/"</h1>} />
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/register" exact element={<SignupForm />} />
          <Route path="/api/upload" exact element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
}