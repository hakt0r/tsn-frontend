import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './redux';
import { CssBaseline } from '@material-ui/core';
import { ThemeSwitcher } from './theme';
import { BrowserRouter } from 'react-router-dom';

document.body.onscroll = e => {
  if ( ( window.innerHeight + window.scrollY ) >= document.body.offsetHeight - 10 ) {
    if ( window.loadMore ) window.loadMore()
  }
}

ReactDOM.render(
<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ThemeSwitcher>
        <CssBaseline/>
        <App/>
      </ThemeSwitcher>
    </BrowserRouter>
  </Provider>
</React.StrictMode>,
document.getElementById('root') );
