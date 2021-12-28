import "../css/app.css";
import "../css/posts.css";
import React from "react";
import Upload from "./upload";
import Nav from "../components/nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./posts";

import SignupForm from "../components/signupForm";
import LoginForm from "../components/loginForm";

class App extends React.Component {

  state = {
    loading: true,
    posts: [],
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:4000/api/posts");
    const data = await response.json();
    this.setState({ posts: data, loading: false });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Router>
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
