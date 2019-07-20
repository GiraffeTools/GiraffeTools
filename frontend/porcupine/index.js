import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import store from './store';
import App from './app';

require('./scss/porcupine.scss');

render(
    <Provider store={store}>
      <BrowserRouter>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </Provider>,
    document.getElementById('porcupine')
);
