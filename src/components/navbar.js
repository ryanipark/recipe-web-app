import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Pages
import Home from './home.js';
import About from './about.js';
import Login from './login.js';

// Styling
import '../assets/navbar.css'

function Navbar() {
  return (
    <Router>
        <nav className="navbar">
          <div className="logo">Logo goes here</div>
          <ul className="nav-links">
            <li><NavLink exact="true" to="/">Home</NavLink></li>
            <li><NavLink exact="true" to="/about">About</NavLink></li>
          </ul>
          <div className="login"><NavLink exact="true" to="/login">Login</NavLink></div>
        </nav>
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route exact="true" path="/about" element={<About />} />
        <Route exact="true" path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}


export default Navbar;
