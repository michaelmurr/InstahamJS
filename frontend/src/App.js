import React from "react";
import "./css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./signupForm";
import Nav from "./nav";
import Upload from "./upload";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Nav />

          <Routes>
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </Router>

      </div>
    );
  }
}

export default App;
