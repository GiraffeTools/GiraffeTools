import React from "react";

const Tools = () => (
  <div>
    <div className="container-fluid base">
      <div className="col text-center">
        <h1>Giraffe</h1>
        <h4 className="">
          Graphical Interface for Reproducible Analysis For workFlow
          Experiments
        </h4>
        Giraffe tools are applications that make it easier to analyse all
        kinds of data!
      </div>
      <div />
    </div>

    <div className="container-fluid mt-3 ">
      <div className="col text-center">
        <h1>Porcupine</h1>
        <h4 className="">PORcupine Creates Ur PipelINE</h4>
        With Porcupine, you can visually build your pipeline!
      </div>
      <div className="col text-center">
        <a
          className="btn btn-lg btn-warning"
          role="button"
          href="/porcupine"
        >
          Get started!
        </a>
      </div>
    </div>

    <div className="container-fluid mt-3 ">
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
  </div>
);

export default Tools;
