import React, { Fragment } from "react";
import Radium from "radium";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "../styles/navigation.js";

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

  toggleNavigation() {
    this.setState({
      showNavigation: !this.state.showNavigation
    });
  }

  render() {
    const { showNavigation } = this.state;
    const { user } = this.props;

    const triangle = (
      <img src="/static/img/nav_triangle.svg" style={[styles.navTriangle]} />
    );

    return (
      <Nav
        // className="flex-column float-right"
        // style={{...styles.navigation, ...(showNavigation && styles.navigation.out)}}
        style={styles.navigation}
        fixed="top"
        sticky="top"
        onToggle={this.toggleNavigation}
      >
        {triangle}
      </Nav>
    );
  }
}

export default Radium(Navigation);
