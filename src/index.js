import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// Local imports
import store from './store/index.js'
import Navbar from './components/navbar.js';


function App() {
  return (
    <Provider store ={store}>
      <div><Navbar /></div>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);


