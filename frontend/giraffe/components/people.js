import React from 'react';
import Radium from 'radium';
import Container from 'react-bootstrap/Container';

import SeparatorWithOpenCircle from './separatorWithOpenCircle';
import styles from '../styles/people.js';

const People = () => (
  <Container fluid={true} style={styles.people}>
    <div style={[styles.peopleBackground]} />
    <h2 style={[styles.peopleHeading]}>THE PEOPLE</h2>
    <div
      className="d-flex justify-content-md-center"
      style={[styles.peopleBox]}
    >
      <div className="col col-lg-4 text-center">
        <img
          src="/static/img/tim_artsy_portrait.png"
          style={[styles.artsyPortrait]}
        />
      </div>
      <div
        className="col col-lg-4 text-left position-relative"
        style={[styles.toolText]}
      >
        <h3 style={[styles.peopleTitle]}>Tim van Mourik</h3>
        <SeparatorWithOpenCircle
          color="secondary"
          thickness={'1px'}
          styleOverwrite={styles.componentStyles}
        />
        {`Neuroscientist, data analyst, open science/source advocate, workflow
          expert, visualisation nerd`}
        <br />
        <a
          href="https://github.com/TimVanMourik"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/static/img/github_icon.svg" style={[styles.icon]} />
        </a>
        <a
          href="https://nl.linkedin.com/in/tim-van-mourik-616249a1"
          target="_blank"
          rel="noopener noreferrer"
          style={[styles.icon]}
        >
          <img src="/static/img/linkedin_icon.svg" style={[styles.icon]} />
        </a>
        <a
          href="mailto:timvanmourik@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          style={[styles.icon]}
        >
          <img src="/static/img/mail_icon.svg" style={[styles.icon]} />
        </a>
        <a
          href="https://www.timvanmourik.com"
          target="_blank"
          rel="noopener noreferrer"
          style={[styles.icon]}
        >
          <img src="/static/img/web_icon.svg" style={[styles.icon]} />
        </a>
      </div>
    </div>
  </Container>
);

export default Radium(People);
