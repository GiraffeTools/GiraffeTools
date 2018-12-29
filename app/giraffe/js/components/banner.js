import React from "react";
import Radium from "radium";

import Navigation from "./navigation";
import styles from "../styles/banner.js";

const Banner = ({ title }) => (
  <div className="container-fluid position-relative" style={[styles.banner]}>
    <Navigation />
    <a href="/">
      <img
        src="/static/img/giraffetools_logo.png"
        className="float-left position-absolute"
        style={[styles.bannerLogo]}
      />
    </a>
    <h1 className="position-absolute" style={[styles.bannerTitle]}>
      {title}
    </h1>
  </div>
);

export default Radium(Banner);
