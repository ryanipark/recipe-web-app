import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

// Redux
import { useDispatch , useSelector } from 'react-redux';
import { logout } from '../store/actions';

// Utility
import checkSession from '../utility/checkSession.js';

// Pages
import Home from './home';
import About from './about';
import Login from './login';
import Profile from './profile';

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

  // Only allows logged in users to visit profile
  const Private = (Component) => {
    const user = useSelector(state => state.user);
    return user ? <Profile /> : <Navigate to="/" />  // Does not let checkSession at route level run first
  }

  return (
    <Router>
        <nav className="navbar">
          <div className="logo">Logo goes here</div>
          <ul className="pages">
            <li><NavLink exact="true" to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
          <ul className="user">
          {user ? (
          <>
          <li><NavLink to="/profile">{user.username}</NavLink></li>
          <li><button onClick={handleLogout}>Logout</button></li>
          </>
          ) : (
            <li className="login"><NavLink to="/login">Login</NavLink></li>
          )}
          </ul>
        </nav>
      <Routes>
        <Route exact="true" path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Private Component={<Profile />} />} />
      </Routes>
    </Router>
  );
}


export default Navbar;
