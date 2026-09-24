import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Affichage direct et forcé de votre simulateur Hélios Énergie
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
