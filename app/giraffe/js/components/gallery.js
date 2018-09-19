import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";
import GalleryElements from "./galleryElements";

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
        <div className="text-center">
          Here you find a collection of best practices We''d love to include
          more examples, so if you feel like contributing to our bank, check our
          instructions to contribute to our example gallery.
          <br />
          <a type="button btn-primary" className="btn giraffe-button">
            Contribute
          </a>
          <GalleryElements examples={examples} />
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

export default Gallery;
