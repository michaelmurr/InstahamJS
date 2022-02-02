import React, { useState } from "react";
import "../css/signupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";

const API = "https://instahambackend-n95g5.ondigitalocean.app/";

function SignupForm() {
  //define Hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [message, setMessage] = useState("");

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
  const handleSubmit =
    (form_username, form_email, form_password) => (event) => {
      event.preventDefault();

      if (password === confirm_password) {
        let data = {
          username: form_username,
          email: form_email,
          password: form_password,
        };

        const response = fetch(API + "/register", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        });

        //redirect to homepage, token?
      } else {
        setMessage("Passwords don't match!");
      }
    };

  return (
    <div className="formContainer">
      <div className="cardContainer">
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
              Your email will never be shared with anyone.
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
            <Form.Text className="text-muted">{message}</Form.Text>
          </Form.Group>

          <Button className="submitBtn" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignupForm;
