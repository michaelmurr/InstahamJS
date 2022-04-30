import { Button, Form, FloatingLabel, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/signupForm.css";

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(" ");
  const navigate = useNavigate("");
  
  //updates local state
  function onUsernameChange(event) {
    setUsername(event.target.value);
  }
  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function loginUser() {
    return await fetch(`${props.api}/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  //handles the submitting process
  const handleSubmit = () => async (event) => {
    event.preventDefault();
    try{
      const res = await loginUser();
      const token = await res.json();

      //exit if something failed
      if(res.status !== 200) return setMessage(token.message);

      //set token and redirect on success
      props.setToken(token);
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
        <h1>Login</h1>
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

      <Alert variant="success">
        <p>Don't have an account?</p>
        <hr/>
        <Link to="/register" >
        <Button>Create Account</Button>
        </Link>
      </Alert>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
