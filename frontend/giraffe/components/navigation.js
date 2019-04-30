import React, { Fragment } from "react";
import Radium from "radium";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown'
import Container from "react-bootstrap/Container";
import Collapse from 'react-bootstrap/Collapse'

import NavMenu from "../containers/navMenu";
import styles from "../styles/navigation.js";



class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;
    return (
      <Container>
        <img
          style={[styles.navTriangle]}
          src={"/static/img/nav_triangle.svg"}
          onClick={() => this.setState({ open: !open })}
          aria-controls="collapse-menu"
          aria-expanded={open}
        />

        <Container
          style={{...styles.navMenu, ...styles.navMenu[open ? "open" : "closed"]}}
        >
          <NavMenu/>
        </Container>
      </Container>
    );
  }
}
export default Radium(Navigation);
