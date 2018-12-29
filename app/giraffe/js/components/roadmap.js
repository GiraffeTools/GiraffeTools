import React, { Fragment } from "react";
import Radium from "radium";

import styles from "../styles/roadmap.js";

const Event = event => (
  <div className="col-sm">
    <div>{event.year}</div>
    <svg width="60" height="60">
      <circle
        cx="30"
        cy="30"
        r="14"
        stroke="#FFFAEF"
        strokeWidth="10"
        fill="#F25226"
      />
    </svg>
    <h3 style={[styles.roadmapText]}>{event.description}</h3>
  </div>
);
const StyledEvent = Radium(Event);

const Roadmap = () => {
  const events = [
    { year: 2015, description: "Started the project" },
    { year: 2017, description: "Great achievement" },
    { year: 2018, description: "current status is lit!" },
    { year: 2019, description: "wait for big news" },
    { year: 2020, description: "we are on the moon" }
  ];

  return (
    <div className="container-fluid" style={[styles.roadmap]}>
      <h3 style={[styles.roadmapText, styles.andMore]}>&amp; more to come</h3>
      <svg height="10px" width="100%">
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#F7A81C"
          strokeWidth="12px"
        />
      </svg>
      <div className="d-flex" style={[styles.roadmapElements]}>
        {events.map(event => (
          <StyledEvent key={event.year} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Radium(Roadmap);
