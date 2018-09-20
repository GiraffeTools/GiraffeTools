import React from "react";

const Porcupine = () => (
  <div className="container-fluid">
    <img src="/static/img/rec_porcupine_collage.png" id="porcupine-collage" />
    <div className="col text-left">
      <h3>Porcupine</h3>
      <b>POR</b>
      cupine <b>C</b>
      reates <b>U</b>r <b>P</b>
      ipel
      <b>INE</b>
      <br />
      <img src="/static/img/separator_red.svg" width="20%" />
      <br />
      With Porcupine, you can visually build your pipeline!
      <a className="btn btn-lg giraffe-button" role="button" href="/porcupine">
        Get started!
      </a>
    </div>
  </div>
);

const Armadillo = () => (
  <div className="container-fluid">
    <img src="/static/img/rec_armadillo_collage.png" id="armadillo-collage" />
    <div className="col text-left">
      <h3>Armadillo</h3>
      <br />
      <img src="/static/img/separator_red.svg" width="20%" />
      <br />
      <b>A</b>
      ugmented <b>R</b>
      eality [madillo] This web app creates 3D Augmented Reality images from the
      Neurovault database
      <a
        className="btn btn-lg giraffe-button"
        role="button"
        href="https://armadillo-brain.herokuapp.com"
      >
        Get started!
      </a>
    </div>
  </div>
);

const Tools = () => (
  <div className="row">
    <div className="col">
      <div className="col-6 text-center">
        <h2 className="with-lines">Our Tools</h2>
      </div>
    </div>
    <Porcupine />
    <Armadillo />
  </div>
);

export default Tools;
