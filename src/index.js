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
  // Check users session at the root
  checkSession();

  return (
    <Provider store ={store}>
      <div><Navbar /></div>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);


