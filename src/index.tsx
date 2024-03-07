import React from 'react';
import ReactDOM from 'react-dom';
import { ListUsersProvider } from "./context/listUsersContext";
import { CssBaseline } from '@mui/material';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ListUsersProvider>
      <App />
    </ListUsersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
