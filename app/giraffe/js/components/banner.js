import React from "react";

import Navbar from "./navigation";

const Banner = ({ title }) => (
  <div className="container-fluid banner">
    <Navbar />
    <a href="/">
      <img
        src="/static/img/giraffetools_logo.png"
        id="banner-logo"
        className="float-left"
      />
    </a>
    <h1 id="banner-title">{title}</h1>
  </div>
);

export default Banner;
