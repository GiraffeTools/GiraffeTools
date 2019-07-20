import {hot} from 'react-hot-loader/root';
import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import Content from './containers/content';
import UnhappyBrowser from '../giraffe/containers/unhappyBrowser';

const App = () => (
  <Fragment>
    <UnhappyBrowser />
    <Route
      path="/porcupine/:username?/:repository?/:branchOrCommit?"
      component={Content}
    />
  </Fragment>
);
export default hot(App);
