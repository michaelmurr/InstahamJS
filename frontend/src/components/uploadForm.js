import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import useToken from "./useToken";
import LoginForm from "./loginForm";

const API = "https://instahamjs-backend.onrender.com";
//const API = "http://localhost:4000";

async function uploadPost(form_data, auth_token) {
  return fetch(API + "/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: auth_token,
    },
    body: JSON.stringify({ contentString: form_data }),
  });
}

export default function Upload() {
  const [text, setText] = useState("");
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");


  //update local state
  function onTextChange(event) {
    setText(event.target.value);
  }

  const handleSubmit = () => async (event) => {
    event.preventDefault();
    const response = await uploadPost(text, token);
    const json = await response.json();

    if (response.status === 200) {
      navigate("/");
    } else {
      console.log(json);
      setMessage(json);
    }
  };

  return (
    <>
      {!token && <LoginForm setToken={setToken} />}
      {token && (
        <div className="uploadForm">
          <Form onSubmit={handleSubmit()}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
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
      )}
    </>
  );
}
