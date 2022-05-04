import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import useToken from "./useToken";
import LoginForm from "./loginForm";
import "../css/upload.css";

export default function Upload(props) {
  const [text, setText] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  //update local state
  function onTextChange(event) {
    setText(event.target.value);
  }

  async function uploadPost(form_data, auth_token) {
    return fetch(props.api + "/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: auth_token,
      },
      body: JSON.stringify({ contentString: form_data }),
    });
  }

  const handleSubmit = () => async (event) => {
    event.preventDefault();
    setDisableButton(true);
    const response = await uploadPost(text, token);
    setDisableButton(false);
    navigate("/");
  };

  return (
    <>
      {!token && <LoginForm setToken={setToken} />}
      {token && (
        <div className="uploadForm">
          <h1>Upload Post</h1>
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
            <Button className="submitBtn" type="submit" disabled={disableButton}>
              Post
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}
