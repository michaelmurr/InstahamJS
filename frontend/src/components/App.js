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

export default function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Feed />} />
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
