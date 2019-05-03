import React, { Fragment } from "react";
import Radium from "radium";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "../styles/navigation.js";
const NavMenu = props => {
  const { user } = props;

  return (
    <Fragment>
      <Navbar.Brand href="/" style={styles.giraffeBrand}>
        <img
          src="/static/img/giraffetools_logo.png"
          style={[styles.giraffeBrandLogo]}
        />
      </Navbar.Brand>
      <ul style={[styles.navList]}>
        <Nav.Item>
          <Nav.Link href="/porcupine">
            <h3 style={[styles.navItem]} key={0}>Porcupine</h3>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="border-bottom">
          <Nav.Link href="https://armadillobrain.app">
            <h3 style={[styles.navItem]} key={1}>ARmadillo</h3>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://giraffetools.github.io/Documentation">
            <h3 style={[styles.navItem]} key={2}>Documentation</h3>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/faq">
            <h3 style={[styles.navItem]} key={3}>FAQ</h3>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/slack">
            <h3 style={[styles.navItem]} key={4}>Slack</h3>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="border-bottom">
          <Nav.Link href="/github/TimVanMourik/SomeGiraffeExample">
            <h3 style={[styles.navItem]} key={5}>Example project</h3>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={
              user && user.access_token
                ? `/github/${user.github_handle}`
                : `/_oauth/login/?redirect_uri=/`
            }
          >
            {user && user.access_token ? (
              <h3 style={[styles.navItem]} key={6}>My projects</h3>
            ) : (
              <h3 style={[styles.navItem, styles.loginTextNav]} key={7}>
                <img
                  src="/static/img/gh-icon.png"
                  style={[styles.githubButton]}
                />
                Login with GitHub
              </h3>
            )}
          </Nav.Link>
        </Nav.Item>
        {user &&
          user.access_token && (
            <Nav.Item className="border-bottom">
              <Nav.Link href="/_oauth/logout/">
                <h3 style={[styles.navItem]} key={8}>Log out</h3>
              </Nav.Link>
            </Nav.Item>
          )}
      </ul>
    </Fragment>
  );
};

export default Radium(NavMenu);
