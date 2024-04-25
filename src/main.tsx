import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import './main.css'; // Import our own CSS - Should be imported AFTER bootstrap CSS

/**
 * Render the React application to the root element in the HTML document.
 * 
 * @param {React.ReactElement} element - The root component of the application.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);