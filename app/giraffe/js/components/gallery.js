import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import GalleryElements from "./galleryElements";

class Slack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Banner title="Gallery" />
        Here you find a collection of best practices We''d love to include more
        examples, so if you feel like contributing to our bank, check our
        instructions to contribute to our example gallery.
        <button>Contribute</button>
        <GalleryElements />
        <Footer />
      </Fragment>
    );
  }
}

export default Slack;
