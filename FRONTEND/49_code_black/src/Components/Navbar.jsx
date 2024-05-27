import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
    const Navbar = ({ username, onLogout }) => {
        const handleSearch = () => {
          console.log("Searching...");
        };
        return (
            <nav className = "navbar">
              <div className = "logo">
                <Link to = "/">
                  <img src = "your-logo.png" alt = "Logo" />
                </Link>
              </div>
              <div className = "nav-links">
                <Link id = "home" to = "/">
                  Home
                </Link>
                <div className = "search-bar">
                  <input id = "searchBar" type = "text" placeholder = "Search Languages..." />
                  <button id = "searchButton" onClick = {handleSearch}>
                    Search
                  </button>
                </div>
                <Link id = "Languages" to = "/all-Languages">
                  Languages
                </Link>
                {username ? (
                  <>
                    <Link id = "profile" to = "/profile">
                      Profile
                    </Link>
                    <button id = "logoutButton" onClick = {onLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link id = "login" to = "/login">
                    Login
                  </Link>
                )}
                <Link id = "about" to = "/about">
                  About
                </Link>
              </div>
            </nav>
          );
};

export default Navbar ;