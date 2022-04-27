import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

export default function Search(props) {
  const [searchClause, setSearchClause] = useState("");
  async function submitSearch() {}

  return (
    <div className="searchInput">
      <h1>Search</h1>
      <Form>
        <Form.Control type="text" placeholder="Search User" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}