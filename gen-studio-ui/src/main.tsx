/**
 * React Application Entry Point
 * 
 * This file initializes the React application with Sentry error tracking and
 * performance monitoring. It sets up the root component and renders the App.
 * 
 * @version 1.0.0
 */

import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';

/**
 * Render the React application
 * 
 * Creates the root container and renders the App component wrapped in
 * StrictMode for additional development checks
 */
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <App />
  );
}
