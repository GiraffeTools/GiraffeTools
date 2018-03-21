import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './app.js';

render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>, document.getElementById('porcupine')
);
