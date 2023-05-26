import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  // Need a system for user typing /proifle to 
  // Currently navigation is handled by a protected route in navbar

  /*
  if (!user) {
    navigate('/login');
    return null; // Return early if user is not available
  } */

  return (
    <div>
      <h1>Your profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Member since: {user.created_at}</p>
    </div>
  );
}

export default Profile;
