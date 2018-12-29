import React, { Fragment } from "react";
import Radium from "radium";

import styles from "../styles/question.js";

const Question = question => {
  return (
    <li>
      <div style={[styles.question]}>
        <img src="/static/img/chevron_right.svg" className="float-left" />
        <h3>{question.q}</h3>
      </div>
      <br />
      <div className="answer panel-collapse">{question.a}</div>
      <svg width="80%" height="3">
        <line x1="0" y1="0" x2="80%" y2="0" stroke="grey" />
      </svg>
    </li>
  );
};

export default Radium(Question);
