import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Redux
import { useDispatch , useSelector } from 'react-redux';
import { logout } from '../store/actions';

// Pages
import Home from './home.js';
import About from './about.js';
import Login from './login.js';
import Profile from './profile.js';

// Styling
import '../assets/navbar.css'

function Navbar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Fetch to destroy the session
    try {
      const logoutResponse = await fetch('http://146.190.164.153:3000/api/logout',{
        credentials: 'include'
      })
      if(logoutResponse.ok){  // If the logout was successful remove user from store
        dispatch(logout());
        window.location.href = '/'; // Send to homepage, temporary fix
      } else{
        console.log("Unable to logout");
      }
    } catch(err){
      console.log(err)
    }
  };

  return (
    <Router>
        <nav className="navbar">
          <div className="logo">Logo goes here</div>
          <ul className="pages">
            <li><NavLink exact="true" to="/">Home</NavLink></li>
            <li><NavLink exact="true" to="/about">About</NavLink></li>
          </ul>
          <ul className="user">
          {user ? (
          <>
          <li><NavLink exact="true" to="/profile">{user.username}</NavLink></li>
          <li><button onClick={handleLogout}>Logout</button></li>
          </>
          ) : (
            <li className="login"><NavLink exact="true" to="/login">Login</NavLink></li>
          )}
          </ul>
        </nav>
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route exact="true" path="/about" element={<About />} />
        <Route exact="true" path="/login" element={<Login />} />
        <Route exact="true" path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}


export default Navbar;
