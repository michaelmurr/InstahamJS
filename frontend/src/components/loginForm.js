import React, { useState } from "react";
import "../css/signupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //updates local state
  function onUsernameChange(event) {
    setUsername(event.target.value);
  }
  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  //handles the submitting process
  const handleSubmit = (form_username, form_password) => (event) => {
    event.preventDefault();

    const data = {
      username: form_username,
      password: form_password,
    };

   fetch("http://localhost:4000/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    }).then(res => {
      console.log("Status: ", res.status);
      res.state === 200 ? console.log("Success!") : console.log("Pain");
      
        navigate("/");

    })
  };

  return (
    <div className="formContainer">
      <div className="cardContainer">
        <Form onSubmit={handleSubmit(username, password)} className="signupForm">
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

export default LoginForm;