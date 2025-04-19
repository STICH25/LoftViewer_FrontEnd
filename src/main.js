import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  React.createElement(
    StrictMode,
    null,
    React.createElement(
      Router,
      null,
      React.createElement(App, null)
    )
  )
);