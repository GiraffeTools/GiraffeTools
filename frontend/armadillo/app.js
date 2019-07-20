import {hot} from 'react-hot-loader/root';
import React, {Fragment} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import ContentContainer from './containers/contentContainer';

const App = () => (
  <Fragment>
    <Route
      path="/armadillo/:username?/:repository?/:branchOrCommit?"
      component={ContentContainer}
    />
  </Fragment>
);
export default hot(App);
