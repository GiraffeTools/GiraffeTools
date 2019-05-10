import React, { Fragment } from "react";
import Radium from "radium";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import styles from "../styles/galleryElement";
import SeparatorWithOpenCircle from "./separatorWithOpenCircle";

const GalleryElement = ({ example }) => (
  <Col sm={4} style={styles.cardContainer}>
    <Card style={styles.card}>
      <Card.Img variant="top" src="/static/img/armadillo_card.jpg" />
      <Card.Body style={styles.cardBody}>
        <Card.Title style={styles.cardTitle}>{example.title}</Card.Title>
        <SeparatorWithOpenCircle
          color="secondary"
          styleOverwrite={styles.separator}
        />
        <Card.Text>{example.description}</Card.Text>
      </Card.Body>
      <Button
        variant="light"
        data-toggle="tooltip"
        data-placement="top"
        href={example.repo_link}
        style={styles.discover}
      >
        Discover
      </Button>
    </Card>
  </Col>
);

export default Radium(GalleryElement);
