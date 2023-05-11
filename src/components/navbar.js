import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';


// Pages
import Home from './home.js';
import About from './about.js';

function Navbar() {
  return (
    <Router>
      <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default Navbar;
