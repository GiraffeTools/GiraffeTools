import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './app.js';

const Root = ({store}) => (
  <Provider className="app" store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
