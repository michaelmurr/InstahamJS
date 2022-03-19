import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { Button, Container, Navbar } from "react-bootstrap";
import home_icon from "../home_icon.png";
import upload_icon from "../plus_icon.png";
import search_icon from "../search_icon.png";
import profile_icon from "../profile_icon.png";

function Nav() {
  return (
<Navbar fixed="bottom" className="navbar">
        <ul className="navList">
            <li>
                <Link to="/"><img src={home_icon} alt="home icon"/></Link>
            </li>
            <li>
                <Link to="/search"><img src={search_icon} alt="search icon"/></Link>
            </li>
          <li>
            <Link to="/api/upload"><img src={upload_icon} alt="upload icon"/></Link>
          </li>
          <li>
            <Link to="/profile"><img src={profile_icon} alt="upload icon"/></Link>

          </li>
        </ul>
</Navbar>
      /*}
      <Link to="/login">
        <Button>Sign In</Button>
      </Link>

      <Link to="/register">
        <Button>Sign Up</Button>
      </Link>
  {*/
  );
}

export default Nav;
