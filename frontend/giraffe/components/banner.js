import React from "react";
import Radium from "radium";
import Container from "react-bootstrap/Container";

import styles from "../styles/banner.js";

const Banner = ({ title }) => (
  <Container fluid={true} style={styles.banner}>
    <img
      src="/static/img/giraffetools_logo.png"
      className="float-left position-absolute"
      style={[styles.bannerLogo]}
    />
    <h1 style={[styles.bannerTitle]}>{title}</h1>
  </Container>
);

export default Radium(Banner);
