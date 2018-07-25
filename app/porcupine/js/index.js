import PropTypes from 'prop-types';
import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import configureStore from './store/configureStore';
import ContentContainer from './containers/contentContainer';

const App = hot(module)( () =>
  <ContentContainer classname="app"/>
)

const store = configureStore();

render(
  <Provider className="app" store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('porcupine')
);
