import React from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import "./css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";

const inputStyle = {
  backgroundColor: "#555",
  border: "0 solid transparent",
  
}

const textStyle = {
  color: "#AAA",
}
class App extends React.Component {

  validate(){
    console.log(this.email.valu);
  }

  render() {
    return (
      <div className="App">
        <div className="formContainer">
        <div className="cardContainer">


          <Form formAction="/" method="post" className="signupForm">
            <Form.Group>
              <FloatingLabel label="Email address" style={textStyle}>
                <Form.Control type="email" placeholder="Email address" className="formInput" style={inputStyle} />
              </FloatingLabel>
              <Form.Text className="text-muted">Your email will never be shared with anyone.</Form.Text>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Username" style={textStyle}>
                <Form.Control type="text" placeholder="Username" className="formInput" style={inputStyle}/>
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Password" style={textStyle}>
                <Form.Control type="password" placeholder="Password" className="formInput" style={inputStyle}/>
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Confim Password" style={textStyle}>
                <Form.Control type="password" placeholder="Confirm Password" className="formInput" style={inputStyle}/>
              </FloatingLabel>
            </Form.Group>
            <Button type="submit" style={{backgroundColor: "green", border: "1px solid green"}}>Sign Up</Button>
          </Form>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
