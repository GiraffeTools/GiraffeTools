import React, { Fragment } from "react";

import Banner from "./banner";
import Footer from "./footer";

class Project extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Banner title="Project" />
        <Footer />
      </Fragment>
    );
  }
}

export default Project;
