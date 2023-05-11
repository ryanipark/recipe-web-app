import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './navbar.js';

function App() {
  return (
    <>
      <div><Navbar /></div>
      Index Page outside of navbar
    </>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
