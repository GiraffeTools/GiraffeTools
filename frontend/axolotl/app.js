import {hot} from 'react-hot-loader/root';
import React, {Fragment} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Content from './components/content';
import UnhappyBrowser from '../giraffe/containers/unhappyBrowser';

const App = () => (
  <Fragment>
    <UnhappyBrowser />
    <Route
      path="/axolotl/:username?/:repository?/:branchOrCommit?"
      component={Content}
    />
  </Fragment>
);
export default hot(App);
