import React, { Fragment } from "react";

const Event = event => {
  return (
    <Fragment>
      <span className="year">{event.year}</span>
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r="10"
          stroke="#FFFAEF"
          stroke-width="4"
          fill="#F25226"
        />
      </svg>
      <span className="description">{event.description}</span>
    </Fragment>
  );
};

const Roadmap = () => {
  const events = [
    { year: 2015, description: "Started the project" },
    { year: 2017, description: "Great achievement" },
    { year: 2018, description: "current status is lit!" },
    { year: 2019, description: "wait for big news" },
    { year: 2020, description: "we are on the moon" }
  ];

  return (
    <div className="container-fluid" id="roadmap">
      <h2>Roadmap</h2>
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
      <div className="col text-center">
        <span id="roadmap-elements">
          {events && events.map(event => <Event key={event.year} {...event} />)}
        </span>
      </div>
    </div>
  );
};

export default Roadmap;
