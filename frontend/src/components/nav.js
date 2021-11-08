import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/nav.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./upload";
import { Button } from "react-bootstrap";

function Nav() {
    return (
        <div className="navContainer">
            <a href="/"><img src="logo.png" /></a>
            <nav className="navbar">
                <ul className="navList">
                    <li>
                        <Link to="/upload">Create a new Post</Link>
                    </li>
                </ul>
            </nav>
            <Button>Sign Up</Button>
        </div>
    );
}

export default Nav;