import React, { useState } from 'react';

function login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);

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
        setUser(userData.user);
        setLoginError(false);
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Log in</button>
      {loginError && <div>Unable to login</div>}
      {user && <div>Username: {user.username}</div>}
      {user && <div>Email: {user.email}</div>}
    </form>
  );
}

export default login;
