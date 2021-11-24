import "../css/app.css";
import "../css/posts.css";
import React from "react";
import Upload from "./upload";
import Nav from "../components/nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./posts";

import SignupForm from "../components/signupForm";

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
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Router>
        <Posts posts={this.state.posts} />

{/* 
        <div className="fetchedPosts">
          {this.state.posts.map(post => (
            <div key={post.ownerID} id={post.ownerID} className="postContainer">
              <div>{post.filename}</div>
              <div>{post.uploadDate}</div>
              <div>Likes: {post.likes}</div>
            </div>
          ))}
        </div>
*/}
      </div>
    );
  }
}

export default App;
