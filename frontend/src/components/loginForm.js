import React, { useState } from "react";
import "../css/signupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const API = "//instahambackend.herokuapp.com";

async function loginUser(credentials){
  return fetch(API + "/login", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json());
}

export default function LoginForm({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //updates local state
  function onUsernameChange(event) {
    setUsername(event.target.value);
  }
  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  //handles the submitting process
  const handleSubmit = () => async (event) => {
    event.preventDefault();
    const token = await loginUser({username, password});
    setToken(token);
    setMessage("Success!");
    }

  return (
    <div className="formContainer">
      <div className="cardContainer">
        <Form
          onSubmit={handleSubmit(username, password)}
          className="signupForm"
        >
          <Form.Group>
            <FloatingLabel className="formLabel" label="Username">
              <Form.Control
                value={username}
                onChange={onUsernameChange}
                name="username"
                type="text"
                placeholder="Username"
                className="formInput"
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel className="formLabel" label="Password">
              <Form.Control
                value={password}
                onChange={onPasswordChange}
                name="password"
                type="password"
                placeholder="Password"
                className="formInput"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Text className="text-muted">{message}</Form.Text>
          <Button className="submitBtn" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

LoginForm.propTypes={
  setToken: PropTypes.func.isRequired
}