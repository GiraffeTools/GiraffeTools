import React from 'react';
import {StyleRoot} from 'radium';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import pluralize from 'pluralize';

import styles from '../styles/commit';

const Commit = ({commit, fullName}) => {
  const daysAgo = Math.floor(
      (Date.now() - new Date(commit.commit.author.date)) / 1000 / 3600 / 24
  );
  const maxLength = 28;
  const message =
    commit.commit.message.length < maxLength
      ? commit.commit.message
      : commit.commit.message.substring(0, maxLength - 3) + '...';

  return (
    <StyleRoot>
      <Row style={styles.commitBox}>
        <Col sm={6} style={{textAlign: 'left'}}>
          <h5>{message}</h5>
          <b>@{commit.commit.author.login}</b>
          {` committed ${daysAgo} ` + pluralize('day', daysAgo) + ' ago'}
        </Col>
        <Col sm={6} style={{textAlign: 'right'}}>
          <Button
            variant="light"
            target="_blank"
            href={commit.html_url}
            style={styles.commitHashButton}
          >
            <img src="/static/img/gh-icon.png" style={[styles.githubButton]} />
            {commit.sha.substring(0, 6)}
          </Button>
          <Button
            variant="light"
            data-toggle="tooltip"
            data-placement="top"
            href={`/porcupine/${fullName}/${commit.sha}`}
            style={styles.openButton}
          >
            open
          </Button>
        </Col>
      </Row>
    </StyleRoot>
  );
};

export default Commit;
