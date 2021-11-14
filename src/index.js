import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import GlobalStateProvider from './contexts/GlobalStateProvider';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
