import React from 'react';
import Radium from 'radium';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import styles from '../styles/roadmap.js';

const Event = (event) => (
  <Col>
    <div>{event.year}</div>
    <svg width="60" height="60">
      <circle
        cx="30"
        cy="30"
        r="14"
        stroke="#FFFAEF"
        strokeWidth="10"
        fill="#F25226"
      />
    </svg>
    <h3 style={[styles.roadmapText]}>{event.description}</h3>
  </Col>
);
const StyledEvent = Radium(Event);

const Roadmap = () => {
  const events = [
    {year: 2015, description: 'Started Porcupine development'},
    {year: 2017, description: 'Stand-alone Porcupine finished'},
    {year: 2018, description: 'Web version GiraffeTools started'},
    {year: 2019, description: 'GiraffeTools launched'},
    {year: 2020, description: 'We are on the moon!'},
  ];

  return (
    <Container fluid={true} style={styles.roadmap}>
      <h3 style={[styles.roadmapText, styles.andMore]}>&amp; more to come</h3>
      <svg height="10px" width="100%">
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#F7A81C"
          strokeWidth="12px"
        />
      </svg>
      <div style={styles.roadmapElements}>
        {events.map((event) => (
          <StyledEvent key={event.year} {...event} />
        ))}
      </div>
    </Container>
  );
};

export default Radium(Roadmap);
