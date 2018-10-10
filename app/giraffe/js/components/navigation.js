import React from "react";

import WatchOutsideClick from "./watchOutsideClick";

// <nav className="fixed-top navbar" id="nav-triangle">
class Navigation extends React.Component {
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
    const { toggleNavigation, showNavigation } = this.props;
    const { user } = this.state;

    return (
      <div className="fixed-top" id="nav-top">
        <a
          className={showNavigation ? " collapse" : ""}
          onClick={toggleNavigation}
        >
          <img src="/static/img/nav_triangle.svg" id="nav-triangle" />
        </a>

        <WatchOutsideClick
          onOutsideClick={toggleNavigation}
          isActive={showNavigation}
          classes={
            "nav nav-out flex-column float-right" +
            (showNavigation ? "" : " collapse")
          }
        >
          <div className="d-flex" id="brand-box">
            <a className="navbar-brand" href="/" id="giraffe-brand">
              <img src="/static/img/giraffetools_logo.png" id="giraffe-brand" />
            </a>
          </div>
          <ul id="nav-list">
            <li className="nav-item border-bottom">
              <a
                className="nav-link"
                href={
                  user && user.access_token
                    ? `/github/${user.github_handle}`
                    : `/_github/auth/?redirect_uri=/`
                }
              >
                <h3>
                  {user && user.access_token
                    ? `My projects`
                    : "Login with GitHub"}
                </h3>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/porcupine">
                <h3>Porcupine</h3>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://armadillobrain.app">
                <h3>ARmadillo</h3>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/slack">
                <h3>Join Slack</h3>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/github/TimVanMourik/SomeGiraffeExample"
              >
                <h3>Example project</h3>
              </a>
            </li>
            {user &&
              user.access_token && (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <h3>Log out</h3>
                  </a>
                </li>
              )}
          </ul>
        </WatchOutsideClick>
      </div>
    );
  }
}

export default Navigation;
