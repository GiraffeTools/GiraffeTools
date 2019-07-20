import React from 'react';
import Radium from 'radium';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import {shuffle} from '../utils/utils';
import styles from '../styles/contributor.js';

const Contributor = (contributor) => {
  return (
    <Col sm={4} style={styles.contributor}>
      <Card style={styles.contributorCard}>
        <img src={contributor.avatar_url} style={[styles.avatarImage]} />
        <div style={[styles.contributorTag]}>
          <a href={contributor.html_url} style={[styles.link]} target="_blank">
            <b style={[styles.username]}>@{contributor.login}</b>
          </a>
        </div>
      </Card>
    </Col>
  );
};

export default Radium(Contributor);
