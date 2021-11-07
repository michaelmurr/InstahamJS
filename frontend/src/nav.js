import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/app.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import signupForm from "./signupForm";
import Upload from "./upload";

function Nav() {
    return (
            <nav className="navbar">
                <a><img src="logo.png" /></a>
                <ul className="navList">
                        
                        <li>
                        <Link to="/signup">Sign Up</Link>
                        </li>
                </ul>
            </nav>
    );
}

export default Nav;