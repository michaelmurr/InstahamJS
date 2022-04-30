import "../css/app.css";
import "../css/posts.css";
import "bootstrap/dist/css/bootstrap.min.css";

import useToken from "./useToken";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./nav";
import Feed from "./feed";
import Profile from "./profile";
import Upload from "./uploadForm";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import Search from "./search";
import User from "./user";

export default function App() {
  const { setToken } = useToken();

  const API = "https://instahamjs-backend.onrender.com";
  //const API = "http://localhost:4000";

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Feed api={API} />} />
          <Route
            path="/login"
            exact
            element={<LoginForm setToken={setToken} API={API} />}
          />
          <Route path="/register" exact element={<SignupForm api={API} />} />
          <Route path="/api/upload" exact element={<Upload api={API} />} />
          <Route path="/profile" exact element={<Profile api={API} />} />
          <Route path="/search" exact element={<Search api={API} />} />
          <Route path="/users/:id" element={<User api={API} />} />
        </Routes>
      </Router>
    </div>
  );
}
