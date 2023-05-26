import { useEffect } from 'react';
import { setUser } from '../store/actions';
import store from '../store';


// one fix is to implment this in root and profile, using a useEffect to navigate

const checkSession = async () => {
  try {
    const response = await fetch('http://146.190.164.153:3000/api/user', {
      credentials: 'include'
    });
    const userData = await response.json();
    if (userData.user) {
      store.dispatch(setUser(userData.user));
      return true; // User exists
    } else {
      return false; // User does not exist
    }
  } catch (err) {
    console.error(err);
    return false; // Error occurred, user does not exist
  }
};

export default checkSession;
