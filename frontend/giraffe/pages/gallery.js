import React, { Fragment } from "react";
import Radium from "radium";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Banner from "../components/banner";
import GalleryCards from "../components/galleryCards";
import Footer from "../components/footer";
import styles from "../styles/gallery.js";

const Gallery = () => (
  <Fragment>
    <Banner title="Gallery" />
    <div style={[styles.intro]}>
      <p>
        Here you find a collection of best practices We'd love to include more
        examples, so if you feel like contributing to our bank, check our
        instructions to contribute to our example gallery.
      </p>
      <Button
        variant="light"
        data-toggle="tooltip"
        data-placement="top"
        // href={}
        style={styles.contribute}
      >
        Contribute
      </Button>
    </div>
    <Container style={styles.cardContainer}>
      <GalleryCards />
    </Container>
    <hr style={[styles.hr]} />
    <Footer />
  </Fragment>
);

export default Radium(Gallery);
