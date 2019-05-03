import React, { Fragment } from "react";
import Radium from "radium";
import Col from "react-bootstrap/Col";

import styles from "../styles/people.js";

const GalleryElement = ({ example }) => (
  <Col sm={5} style={styles.exampleCard}>
    <img src="/static/img/armadillo_card.jpg" style={[styles.cardImage]} />
    <h3>{example.title}</h3>
    <img src="/static/img/separator_red.svg" />
    <br />
    {example.description}
    <br />
    <a type="button btn-primary" className="btn">
      Discover
    </a>
  </Col>
);

export default Radium(GalleryElement);
