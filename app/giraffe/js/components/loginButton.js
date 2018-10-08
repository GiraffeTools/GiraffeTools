import React from "react";

const LoginButton = () => (
  <a
    type="button btn-primary btn-lg "
    className="btn giraffe-button-large"
    href={`/_github/auth/?redirect_uri=/`}
  >
    <img src="/static/img/gh-icon-white.svg" id="github-button" />
    Login with GitHub
  </a>
);

export default LoginButton;
