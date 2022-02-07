import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

const API = "http://localhost:4000";

function Upload() {
    const [text, setText] = useState("");

    //update local state 
    function onTextChange(event){
        setText(event.target.value);
    }

    const handleSubmit = (form_text) => async (event) => {
        event.preventDefault();

        const data = {
          contentString: form_text,
        }

        const response = await fetch(API + "/api/upload", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        });
    }

  return (
    <div className="uploadForm">
      <Form
      onSubmit={handleSubmit(text)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control as="textarea" rows={3} value={text} placeholder="Share something" onChange={onTextChange}/>
        </Form.Group>
        <Button className="submitBtn" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
}

export default Upload;
