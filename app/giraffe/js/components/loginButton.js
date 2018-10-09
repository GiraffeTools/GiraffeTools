import React from "react";
import { login } from "../utils/auth";

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetch("/_github/logged_in/")
      .then(response => response.json())
      .then(user => this.setState({ user }))
      .catch();
  }

  render() {
    const { user } = this.state;
    return (
      <a
        type="button btn-primary btn-lg "
        className="btn giraffe-button-large"
        href={user && user.access_token ? `/_github/auth/?redirect_uri=/` : `/github/${user.github_name}`}
      >
        <img src="/static/img/gh-icon-white.svg" id="github-button" />
        {user && user.access_token ? user.github_name : "Login with GitHub"}
      </a>
    );
  }
}
export default LoginButton;
