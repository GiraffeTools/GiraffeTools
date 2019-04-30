import React from "react";
import Radium from "radium";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "../styles/footer";

const Footer = () => (
  <Container
    fluid={true}
    style={styles.footer}
  >
    <Row>
      <Col
        sm={{span:3, offset: 1}}
        style={styles.footerText}
      >
        <p style={[styles.copyright]}>
          <b>&copy; 2018 Tim van Mourik</b>
        </p>
        <p style={[styles.copyright]}>Imprint | Privacy</p>
        <p style={[styles.copyright]}>Designed by Fuchsfabrik</p>
      </Col>
      <Col sm={{ span: 3, offset: 5 }}
        style={styles.logoContainer}
      >
        <img
          src="/static/img/giraffetools_logo_notext.png"
          style={styles.footerLogo}
        />
      </Col>
    </Row>
  </Container>
);

export default Radium(Footer);
