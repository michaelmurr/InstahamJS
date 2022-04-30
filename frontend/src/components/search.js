import React, { useState } from "react";
import {Button, Form } from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Search(props) {
  const [searchClause, setSearchClause] = useState("");
  const [users, setUsers] = useState([]);

  async function submitSearch(e) {
    e.preventDefault();
    const res = await fetch(props.api + "/search/" + searchClause);
    const data = await res.json();
    setUsers(data);
  }

  //handle input change
  function onSearchChange(e) {
    setSearchClause(e.target.value);
  }

  return (
    <div className="searchInput">
      <h1>Search</h1>
      <Form>
        <Form.Control
          type="text"
          placeholder="Search User"
          onChange={onSearchChange}
        />
        <Button
          type="submit"
          onClick={(e) => {
            submitSearch(e);
          }}
        >
          Submit
        </Button>
      </Form>
      <div className="foundUsers">
        {users.map((user) => (
          <div key={user._id} className="user">
            <Link to={`/users/${user._id}`}>
              <h3>{user.username}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
