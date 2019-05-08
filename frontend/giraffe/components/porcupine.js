import React from "react";
import Radium from "radium";

import SeparatorWithOpenCircle from "./separatorWithOpenCircle";
import componentStyles from "../styles/components.js";
import styles from "../styles/porcupine.js";

const Porcupine = () => (
  <div className="d-flex justify-content-begin">
    <div className="col-6" style={[styles.collage]}>
      <div className="float-left" style={[styles.giraffeLines]}>
        <img src="/static/img/giraffe-line-dots.svg" style={[styles.lines1]} />
        <img src="/static/img/giraffe-lines.svg" style={[styles.lines2]} />
        <img src="/static/img/giraffe-lines.svg" style={[styles.lines3]} />
      </div>
      <img
        src="/static/img/rec_porcupine_collage.png"
        style={[styles.porcupineCollage]}
      />
    </div>
    <div className="col-4 text-left" style={[styles.toolText]}>
      <h3 style={[styles.porcupine]}>Porcupine</h3>
      <SeparatorWithOpenCircle
        color="secondary"
        thickness={"1px"}
        styleOverwrite={[styles.componentStyles]}
      />
      <div style={[styles.innerToolText]}>
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
        className="btn btn-lg"
        style={[styles.getStarted]}
        role="button"
        href="/porcupine/TimVanMourik/GiraffePlayground/master"
        id="tool-button"
      >
        Get started!
      </a>
    </div>
  </div>
);

export default Radium(Porcupine);
