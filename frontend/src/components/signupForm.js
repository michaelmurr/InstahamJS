import "../css/signupForm.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form, FloatingLabel } from "react-bootstrap";

const API = "https://instahamjs-backend.onrender.com";
//const API = "http://localhost:4000";

async function signupUser(credentials) {
  return await fetch(API + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    //.then((data) => data.json())
    .catch((err) => console.log(err));
}


export default function SignupForm() {
  //define Hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate("/");

  //define onChange handlers
  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onConfirm_PasswordChange = (event) => {
    setConfirm_Password(event.target.value);
  };

  
  //handles the submitting process
  const handleSubmit = () => async (event) => {
    event.preventDefault();
    
    //check the input
    if(username.length < 5 || username.length > 16) return setMessage("Length of username may be between 5 and 16 Characters!");
    if(password.length < 8) return setMessage("Password needs to have at least 8 characters!");
    if (password !== confirm_password) return setMessage("Passwords don't match!");

    try {
      const res = await signupUser({ username, email, password });
      const msg = await res.json();

      setMessage(msg.message);
      if (res.status === 200) return navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="formContainer">
      <div className="cardContainer">
        <h1>Create an Account</h1>
        <Form
          onSubmit={handleSubmit(username, email, password)}
          className="signupForm"
        >
          <Form.Group>
            <FloatingLabel className="formLabel" label="Email address">
              <Form.Control
                value={email}
                onChange={onEmailChange}
                name="email"
                type="email"
                placeholder="Email address"
                className="formInput"
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              Your email will never be shared.
            </Form.Text>
          </Form.Group>

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

          <Form.Group>
            <FloatingLabel className="formLabel" label="Confim Password">
              <Form.Control
                value={confirm_password}
                onChange={onConfirm_PasswordChange}
                type="password"
                placeholder="Confirm Password"
                className="formInput"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Text className="text-muted">{message}</Form.Text>
          <br/>
          <Button className="submitBtn" type="submit">
            Register
          </Button>
        </Form>

        <Alert variant="success">
          <p>Already have an account?</p>
          <hr />
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </Alert>
      </div>
    </div>
  );
}
