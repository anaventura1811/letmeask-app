import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// DOM - Document Object Model
// ReactDom renderiza o app dentro do HTML
// HTML dentro do JS --> JSX = JS + XML
