import React, { Fragment } from "react";

import WatchOutsideClick from "./watchOutsideClick";

// <nav className="fixed-top navbar" id="nav-triangle">
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showNavigation: false
    };
    this.toggleNavigation = this.toggleNavigation.bind(this);
  }

  componentDidMount() {
    fetch("/_github/logged_in/")
      .then(response => response.json())
      .then(user => this.setState({ user }))
      .catch();
  }

  toggleNavigation() {
    this.setState({
      showNavigation: !this.state.showNavigation
    });
  }

  render() {
    const { showNavigation } = this.state;
    const { user } = this.state;

    return (
      <div
        className={"fixed-top" + (showNavigation ? " out" : "")}
        id="nav-top"
      >
        <div
          id="collapseable-nav"
          className={
            "nav navigation flex-column float-right" +
            (showNavigation ? " out" : "")
          }
        >
          <div className="d-flex" id="brand-box">
            <a className="navbar-brand" href="/" id="giraffe-brand">
              <img src="/static/img/giraffetools_logo.png" id="giraffe-brand" />
            </a>
          </div>
          <ul id="nav-list">
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
            <li className="nav-item border-bottom">
              <a
                className="nav-link"
                href="/github/TimVanMourik/SomeGiraffeExample"
              >
                <h3>Example project</h3>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/slack">
                <h3>Slack</h3>
              </a>
            </li>
            <li className="nav-item border-bottom">
              <a className="nav-link" href="/faq">
                <h3>FAQ</h3>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={
                  user && user.access_token
                    ? `/github/${user.github_handle}`
                    : `/_github/auth/?redirect_uri=/`
                }
              >
                {user && user.access_token ? (
                  <Fragment>
                    <h3>{`@${user.github_handle}`}</h3>
                    <h3>My projects</h3>
                  </Fragment>
                ) : (
                  <span id="login-text-nav">
                    <img src="/static/img/gh-icon.png" id="github-button" />
                    Login with GitHub
                  </span>
                )}
              </a>
            </li>
            {user &&
              user.access_token && (
                <li className="nav-item border-bottom">
                  <a className="nav-link" href="#">
                    <h3>Log out</h3>
                  </a>
                </li>
              )}
          </ul>
        </div>
        <a
          role="button"
          onClick={() => {
            this.toggleNavigation();
          }}
        >
          <img src="/static/img/nav_triangle.svg" id="nav-triangle" />
        </a>
      </div>
    );
  }
}

export default Navigation;
