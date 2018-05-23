import React from 'react';
import Content from './content';
import { hot } from 'react-hot-loader'

export default hot(module)(function () { // eslint-disable-line
  return (
    <div className="app">
      <Content />
    </div>
  );
})
