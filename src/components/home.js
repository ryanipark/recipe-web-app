import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector(state => state.user);
  
  if(user == null){
    return <h1>Home page, not logged in</h1>
  }
  else{
    return (
      <div>
        <h1>Home page, welcome back</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  }
}

export default Home;
