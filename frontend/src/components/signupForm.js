import React from "react";
import "../css/signupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";

class signupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "", //password in plaintext, will be encrypted on server
      confirm_password: "",
      message: "WOAH",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
  }

  //updates local state and appends to formData
  handleUsernameChange(event) { this.setState({ username: event.target.value }); }
  handleEmailChange(event) { this.setState({ email: event.target.value }); }
  handlePasswordChange(event) { this.setState({ password: event.target.value }); }
  handleConfirmPasswordChange(event) { this.setState({ confirm_password: event.target.value }); }

  //handles the submitting process
  async handleSubmit(event) {
    event.preventDefault();
    /*
   let formData = new FormData();

   formData.append("username", this.state.username);
   formData.append("email", this.state.email);
   formData.append("password", this.state.password);
   
   this.setState({ formstuff: formData});
   */

    //payload for POSTing with fetch
    let init = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "multipart/form-data" },
      body: this.state,
    }

    let response = await fetch("http://localhost:4000/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(this.state),
    });
    const content = await response.json();

    console.log(content);
  }

  render() {
    return (
      <div className="formContainer">
        <div className="cardContainer">

          <h1 id="msg">{this.state.formstuff}</h1>

          <Form onSubmit={this.handleSubmit} className="signupForm">
            <Form.Group>
              <FloatingLabel className="formLabel" label="Email address">
                <Form.Control
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="formInput"

                />
              </FloatingLabel>
              <Form.Text className="text-muted">Your email will never be shared with anyone.</Form.Text>
            </Form.Group>

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

            <Form.Group>
              <FloatingLabel className="formLabel" label="Confim Password">
                <Form.Control
                  value={this.state.confirm_password}
                  onChange={this.handleConfirmPasswordChange}
                  type="password"
                  placeholder="Confirm Password"
                  className="formInput"

                />
              </FloatingLabel>
            </Form.Group>

            <Button className="submitBtn" type="submit">Create Account</Button>

          </Form>
        </div>
      </div>
    )
  }
}

export default signupForm;