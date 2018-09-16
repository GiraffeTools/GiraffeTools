import React from "react";

const Banner = ({ title }) => (
  <div className="container-fluid" id="banner">
    <img src="/static/img/giraffetools_logo.png" width="20%" />

    <h1>{title}</h1>
  </div>
);

export default Banner;
