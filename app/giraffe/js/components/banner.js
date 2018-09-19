import React from "react";

import Navbar from "./navbar";

const Banner = ({ title }) => (
  <div className="container-fluid text-center" id="banner">
    <Navbar />
    <img src="/static/img/giraffetools_logo.png" id="banner-logo" />
    <h1 id="banner-title">{title}</h1>
  </div>
);

export default Banner;
