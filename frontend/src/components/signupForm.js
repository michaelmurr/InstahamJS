import React from "react";
import "../css/signupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";

class signupForm extends React.Component {

  constructor(props) {
    super(props);

    const inputStyle = {
      backgroundColor: "#000",
      border: "0 solid transparent",

    }
    const textStyle = {
      color: "#AAA",
    }
  }

  render() {
    return (
      <div className="formContainer">
        <div className="cardContainer">

          <Form action="localhost:4000/register" method="POST" className="signupForm">
            <Form.Group>
              <FloatingLabel label="Email address" style={this.textStyle}>
                <Form.Control name="email" type="email" placeholder="Email address" className="formInput" style={this.inputStyle} />
              </FloatingLabel>
              <Form.Text className="text-muted">Your email will never be shared with anyone.</Form.Text>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Username" style={this.textStyle}>
                <Form.Control name="password" type="text" placeholder="Username" className="formInput" style={this.inputStyle} />
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Password" style={this.textStyle}>
                <Form.Control name="password" type="password" placeholder="Password" className="formInput" style={this.inputStyle} />
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Confim Password" style={this.textStyle}>
                <Form.Control type="password" placeholder="Confirm Password" className="formInput" style={this.inputStyle} />
              </FloatingLabel>
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: "green", border: "1px solid green" }}>Sign Up</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default signupForm;