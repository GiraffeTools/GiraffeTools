import React, { Fragment } from "react";
import Radium from "radium";

import Banner from "./banner";
import Footer from "./footer";
import GalleryElement from "./galleryElement";
import styles from "../styles/gallery.js";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: null
    };
  }

  componentDidMount() {
    fetch("/api/example_repos")
      .then(response => response.json())
      .then(examples => this.setState({ examples }));
  }

  render() {
    const { examples } = this.state;

    return (
      <Fragment>
        <Banner title="Gallery" />
        <div className="text-center">
          Here you find a collection of best practices We''d love to include
          more examples, so if you feel like contributing to our bank, check our
          instructions to contribute to our example gallery.
          <br />
          <a
            type="button btn-primary"
            className="btn"
            style={[styles.contribute]}
          >
            Contribute
          </a>
          <div className="row" style={[styles.galleryBox]}>
            {examples &&
              examples.map(example => (
                <GalleryElement key={example.id} example={example} />
              ))}
          </div>
        </div>
        <svg width="100%" height="3">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="#F7A81C"
            strokeWidth="4px"
          />
        </svg>
        <Footer />
      </Fragment>
    );
  }
}

export default Radium(Gallery);
