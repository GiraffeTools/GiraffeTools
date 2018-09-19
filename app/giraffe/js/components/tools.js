import React from "react";

const Porcupine = () => (
  <div className="container-fluid">
    <img src="/static/img/rec_porcupine_collage.png" id="porcupine-collage" />
    <div className="col text-center">
      <h1>Porcupine</h1>
      <h4 className="">PORcupine Creates Ur PipelINE</h4>
      With Porcupine, you can visually build your pipeline!
    </div>
    <div className="col text-center">
      <a className="btn btn-lg btn-warning" role="button" href="/test">
        Get started!
      </a>
    </div>
  </div>
);

const Armadillo = () => (
  <div className="container-fluid">
    <img src="/static/img/rec_armadillo_collage.png" id="armadillo-collage" />
    <div className="col text-center">
      <h1>Armadillo</h1>
      <h4 className="">Augmented Reality [madillo]</h4>
      Augmented Reality brain images!
    </div>
    <div className="col text-center">
      <a
        className="btn btn-lg btn-warning"
        role="button"
        href="https://armadillo-brain.herokuapp.com"
      >
        Get started!
      </a>
    </div>
  </div>
);

const Tools = () => (
  <div>
    <h3> Our Tools</h3>
    <Porcupine />
    <Armadillo />
  </div>
);

export default Tools;
