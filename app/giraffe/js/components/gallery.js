import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";

const GalleryElement = () => <div />;

const GalleryElements = ({ examples }) => (
  <Fragment>
    {examples &&
      examples.map(element => <GalleryElement {...element} key={element.id} />)}
  </Fragment>
);

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: null
    };
  }

  render() {
    const { examples } = this.state;

    return (
      <Fragment>
        <Banner title="Gallery" />
        Here you find a collection of best practices We''d love to include more
        examples, so if you feel like contributing to our bank, check our
        instructions to contribute to our example gallery.
        <button>Contribute</button>
        <GalleryElements examples={examples} />
        <Footer />
      </Fragment>
    );
  }
}

export default Gallery;
