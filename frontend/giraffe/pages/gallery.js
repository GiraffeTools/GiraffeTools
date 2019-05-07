import React, { Fragment } from "react";
import Radium from "radium";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";

import Banner from "../components/banner";
import Footer from "../components/footer";
import GalleryElement from "../components/galleryElement";
import styles from "../styles/gallery.js";
import { API_HOST } from "../config";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: null
    };
  }

  async componentDidMount() {
    const response = await fetch(`${API_HOST}/example_repos`);
    this.setState({ examples: await response.json() });
  }

  render() {
    const { examples } = this.state;

    return (
      <Fragment>
        <Banner title="Gallery" />
        <div
          style={[styles.intro]}
        >
          <p>
            Here you find a collection of best practices We'd love to include
            more examples, so if you feel like contributing to our bank, check
            our instructions to contribute to our example gallery.
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
        <Container
          style={[styles.cardContainer]}
        >
          <CardDeck>
            {examples &&
              examples.map(example => (
                <GalleryElement key={example.id} example={example} />
              ))}
          </CardDeck>
        </Container>
        <hr
          style={[styles.hr]}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default Radium(Gallery);
