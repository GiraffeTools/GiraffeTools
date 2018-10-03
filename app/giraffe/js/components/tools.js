import React from "react";

const Porcupine = () => (
  <div className="d-flex justify-content-begin">
    <div className="col-6 collage">
      <img src="/static/img/rec_porcupine_collage.png" id="porcupine-collage" />
    </div>
    <div className="col-4 text-left" id="tool-text">
      <h3>Porcupine</h3>
      <img src="/static/img/separator_red.svg" className="separator-red" />
      <div className="inner-tool-text">
        <b>POR</b>
        {"cupine "}
        <b>C</b>
        {"reates "}
        <b>U</b>
        {"r "}
        <b>P</b>
        ipel
        <b>INE</b>
        <br />
        With Porcupine, you can visually build your pipeline!
      </div>
      <a
        className="btn btn-lg giraffe-button-small"
        role="button"
        href="/porcupine"
        id="tool-button"
      >
        Get started!
      </a>
    </div>
  </div>
);

const Armadillo = () => (
  <div className="d-flex justify-content-end">
    <div className="col-4 text-left" id="tool-text">
      <h3>Armadillo</h3>
      <img src="/static/img/separator_red.svg" className="separator-red" />
      <div className="inner-tool-text">
        <b>A</b>
        ugmented <b>R</b>
        eality [madillo]
        <br />
        This web app creates 3D Augmented Reality images from the Neurovault
        database
        <br />
      </div>
      <a
        className="btn btn-lg giraffe-button-small"
        role="button"
        href="https://armadillobrain.app"
        id="tool-button"
      >
        Get started!
      </a>
    </div>
    <div className="col-6 collage">
      <img src="/static/img/rec_armadillo_collage.png" id="armadillo-collage" />
    </div>
  </div>
);

const Tools = () => (
  <div id="tools">
    <div className="col-6 text-center" id="our-tools">
      <h2 className="with-lines">OUR TOOLS</h2>
    </div>
    <Porcupine />
    <Armadillo />
  </div>
);

export default Tools;
