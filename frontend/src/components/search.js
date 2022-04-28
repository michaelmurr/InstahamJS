import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

export default function Search(props) {
  const [searchClause, setSearchClause] = useState("");
  const [users, setUsers] = useState([]);

  async function submitSearch() {}

   function onSearchChange(e){
    setSearchClause(e.target.value);
    console.log(searchClause);
  }

  return (
    <div className="searchInput">
      <h1>Search</h1>
      <Form>
        <Form.Control type="text" placeholder="Search User"  onChange={onSearchChange}/>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}