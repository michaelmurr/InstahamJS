import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/signupForm.css";

const API = "//instahambackend.herokuapp.com";

async function loginUser(credentials) {
  return await fetch(API + "/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).catch((err) => console.log(err));
}

export default function LoginForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate("");

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
    try{
      const res = await loginUser({ username, password });
      const token = await res.json();

      //exit if something failed
      if(res.status !== 200) return setMessage(token.message);

      //set token and redirect on success
      setToken(token);
      setMessage("Success!");
      navigate("/");
    }
    catch(e){
      console.log(e);
    }
  };

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

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
