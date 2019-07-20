import React, {Fragment} from 'react';
import Async from 'react-async';

async function auth(updateAuth) {
  const response = await fetch('/api/get_user');
  updateAuth(await response.json());
}

const Main = (props) => (
  <Async promiseFn={() => auth(props.updateAuth)}>{props.children}</Async>
);

export default Main;
