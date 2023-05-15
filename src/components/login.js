import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { setUser } from '../store/actions';
import { useDispatch } from 'react-redux';

// Styling
import '../assets/loginform.css'


function login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, isUser] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://146.190.164.153:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      const data = await response.json(); // Currently used for testing

      if (response.ok) {
        // Set state variable to user object
        const userResponse = await fetch('http://146.190.164.153:3000/api/user',{
          credentials: 'include'
        })
        const userData = await userResponse.json();
        isUser(userData.user);            // Used to set locally on this component
        dispatch(setUser(userData.user)); // Used to set in the redux store
        //setLoginError(false);             // Does not display error message/ will be replaced with redirect to home
        navigate('/');

      } else {
        // Login is bad, print error message to user
        setLoginError(true);
      }

      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginbox">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
        {loginError && <div>Unable to login</div>}
        {user && <div>Username: {user.username}</div>}
        {user && <div>Email: {user.email}</div>}
      </form>
    </div>
  );
}

export default login;
