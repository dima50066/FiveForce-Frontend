import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Root rendered');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
