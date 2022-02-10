import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import useToken from "./useToken";
import LoginForm from "./loginForm";

const API = "http://localhost:4000";

async function uploadPost(form_data) {
  return fetch(API + "/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contentString: form_data }),
  });
}

export default function Upload() {
  const [text, setText] = useState("");
  const { token, setToken } = useToken();

  if (!token) return <LoginForm setToken={setToken} />;

  //update local state
  function onTextChange(event) {
    setText(event.target.value);
  }

  const handleSubmit = () => async (event) => {
    event.preventDefault();
    const response = await uploadPost();
  };

  return (
    <div className="uploadForm">
      <Form onSubmit={handleSubmit()}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            placeholder="Share something"
            onChange={onTextChange}
          />
        </Form.Group>
        <Button className="submitBtn" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
}
