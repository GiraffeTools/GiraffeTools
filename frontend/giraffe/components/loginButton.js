import React from 'react';
import Radium from 'radium';

import buttonStyles from '../styles/buttons';
import styles from '../styles/loginButton';

const LoginButton = (props) => {
  const {user} = props;
  const styleOverwrite = props.styles;
  const logoColor = props.logoColor || 'white';
  return (
    <a
      type="button btn-primary btn-lg "
      className="btn"
      style={[buttonStyles.giraffeButton, styleOverwrite]}
      // rewrite this as onClick
      // onClick={login}
      href={
        user && user.access_token
          ? `/github/${user.github_handle}`
          : `/_oauth/login/`
      }
    >
      <img
        src={`/static/img/gh-icon-${logoColor}.svg`}
        style={[styles.githubButton]}
      />
      <span>
        {' '}
        {user && user.access_token
          ? user.github_handle
          : 'Login with GitHub'}{' '}
      </span>
    </a>
  );
};

export default Radium(LoginButton);
