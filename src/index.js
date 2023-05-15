import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// Redux
import { setUser } from './store/actions.js';

// Local imports
import store from './store/index.js'
import Navbar from './components/navbar.js';
import checkSession from './utility/checkSession.js';


function App() {

  /*
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://146.190.164.153:3000/api/user', {
          credentials: 'include'
        });
        const userData = await response.json();
        if (userData.user) {
          store.dispatch(setUser(userData.user));
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, []);
  */
  checkSession();

  return (
    <Provider store ={store}>
      <div><Navbar /></div>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);


