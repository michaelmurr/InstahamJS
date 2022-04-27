import "../css/nav.css";
import React from "react";
import { createRoutesFromChildren, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import home_icon from "../icons/home_icon.png";
import upload_icon from "../icons/plus_icon.png";
import search_icon from "../icons/search_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import profile_icon from "../icons/profile_icon.png";

export default function Nav() {
  return (
    <Navbar fixed="bottom">
      <ul className="navList">
        <li>
          <Link to="/">
            <img src={home_icon} alt="home icon" />
          </Link>
        </li>
        <li>
          <Link to="/search">
            <img src={search_icon} alt="search icon" />
          </Link>
        </li>
        <li>
          <Link to="/api/upload">
            <img src={upload_icon} alt="upload icon" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img src={profile_icon} alt="upload icon" />
          </Link>
        </li>
      </ul>
    </Navbar>
  );
}