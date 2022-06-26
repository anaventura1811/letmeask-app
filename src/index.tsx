import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './services/firebase';
import './styles/global.scss';

ReactDOM.createRoot(
  document.getElementById('root')!).render(
    <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  );

// DOM - Document Object Model
// ReactDom renderiza o app dentro do HTML
// HTML dentro do JS --> JSX = JS + XML
