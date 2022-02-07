import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Nav() {
    return (
        <div className="navContainer">
            <a href="/"><img src="logo.png" alt="logo" /></a>
            <nav className="navbar">
                <ul className="navList">
                    <li>
                        <Link to="/api/upload">Create a new Post</Link>
                    </li>
                </ul>
            </nav>
            <Link to="/login">
                <Button>Sign In</Button>
            </Link>

            <Link to="/register">
                <Button>Sign Up</Button>
            </Link>
        </div>
    );
}

export default Nav;