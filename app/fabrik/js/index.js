
import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './app.js';

render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>, document.getElementById('fabrik')
);
