import React from "react";
import "../css/signupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";

class signupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "", //password in plaintext, will be encrypted on server
      pw_message: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  //updates local state and appends to formData
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  //handles the submitting process
  async handleSubmit(event) {
    event.preventDefault();

    let data = {
      username: this.state.username,
      password: this.state.password,
    };

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
  }

  render() {
    return (
      <div className="formContainer">
        <div className="cardContainer">
          <Form onSubmit={this.handleSubmit} className="signupForm">
            <Form.Group>
              <FloatingLabel className="formLabel" label="Username">
                <Form.Control
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
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
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="formInput"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Text className="text-muted">
              {this.state.pw_message}
            </Form.Text>
            <Button className="submitBtn" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default signupForm;
