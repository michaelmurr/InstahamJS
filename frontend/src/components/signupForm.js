import React from "react";
import "../css/signupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";

class signupForm extends React.Component {

  constructor(props) {
    super(props);

    }

  render() {
    return (
      <div className="formContainer">
        <div className="cardContainer">

          <Form action="http://localhost:4000/register" method="POST" className="signupForm">
            <Form.Group>
              <FloatingLabel className="formLabel" label="Email address">
                <Form.Control name="email" type="email" placeholder="Email address" className="formInput" />
              </FloatingLabel>
              <Form.Text className="text-muted">Your email will never be shared with anyone.</Form.Text>
            </Form.Group>

            <Form.Group>
              <FloatingLabel className="formLabel" label="Username">
                <Form.Control name="password" type="text" placeholder="Username" className="formInput" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel className="formLabel" label="Password">
                <Form.Control name="password" type="password" placeholder="Password" className="formInput"/>
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel className="formLabel" label="Confim Password">
                <Form.Control type="password" placeholder="Confirm Password" className="formInput"/>
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