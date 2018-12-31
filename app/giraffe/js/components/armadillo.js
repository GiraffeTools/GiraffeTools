import React from "react";
import Radium from "radium";

import styles from "../styles/armadillo.js";

const Armadillo = () => (
  <div className="d-flex justify-content-end">
    <div className="col-4 text-left" style={[styles.toolText]}>
      <h3 style={[styles.armadillo]}>Armadillo</h3>
      <img src="/static/img/separator_red.svg" style={[styles.separator]} />
      <div style={[styles.innerToolText]}>
        <b>A</b>
        ugmented <b>R</b>
        eality [madillo]
        <br />
        This web app creates 3D Augmented Reality images from the Neurovault
        database
        <br />
      </div>
      <a
        className="btn btn-lg"
        style={[styles.getStarted]}
        role="button"
        href="https://armadillobrain.app"
      >
        Get started!
      </a>
    </div>
    <div className="col-6" style={[styles.collage]}>
      <img
        src="/static/img/giraffe-lines-diag.svg"
        id="diag-lines-first"
        style={[styles.diagLines1]}
      />
      <img
        src="/static/img/rec_armadillo_collage.png"
        id="armadillo-collage"
        style={[styles.armadilloCollage]}
      />
      <img
        src="/static/img/giraffe-lines-diag.svg"
        id="diag-lines-second"
        style={[styles.diagLines2]}
      />
    </div>
  </div>
);

export default Radium(Armadillo);
