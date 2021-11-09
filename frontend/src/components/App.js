import "../css/app.css";
import React from "react";
import Upload from "./upload";
import Nav from "../components/nav";
import SignupForm from "./signupForm.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {

  //fetches the 10 most recent posts
  async fetchPosts(){
    let posts = await fetch("https://localhost:4000/api/posts");
    console.log(posts);
  }

  render() {

    let posts = this.fetchPosts();

    return (
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Router>
        <div className="postContainer">
        {posts.foreach( post => {
          <div className="post">
            {this.post}
          </div>
        })}
        </div>


      </div>
    );
  }
}

export default App;
