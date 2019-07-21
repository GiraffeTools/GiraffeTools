import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginButton from './loginButton';

import styles from '../styles/tryOut.js';

const TryOut = () => (
  <Container fluid={true} style={styles.tryout}>
    <Row>
      <Col sm={{span: 4, offset: 1}}>
        <span style={styles.getStarted}>
          Get started with your own projects!
        </span>
      </Col>
      <Col sm={{span: 4, offset: 2}} style={styles.githubLogin}>
        <LoginButton styles={styles.loginButton} logoColor="black" />
      </Col>
    </Row>
  </Container>
);

export default TryOut;
