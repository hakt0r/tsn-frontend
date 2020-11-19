import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './redux';
import { CssBaseline } from '@material-ui/core';
import { ThemeSwitcher } from './theme';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeSwitcher>
        <CssBaseline/>
        <App />
      </ThemeSwitcher>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
