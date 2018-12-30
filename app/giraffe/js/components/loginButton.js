import React from "react";
import Radium from "radium";

import buttonStyles from "../styles/buttons";
import styles from "../styles/loginButton";

import { login } from "../utils/auth";

const LoginButton = props => {
  const { user } = props;
  const styleOverwrite = props.styles;
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
          : `/_github/auth/?redirect_uri=/`
      }
    >
      <img src="/static/img/gh-icon-white.svg" style={[styles.githubButton]} />
      <span>
        {" "}
        {user && user.access_token
          ? user.github_handle
          : "Login with GitHub"}{" "}
      </span>
    </a>
  );
};

export default Radium(LoginButton);
