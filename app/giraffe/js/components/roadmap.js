import React, { Fragment } from "react";

const Event = event => (
  <div className="col-sm">
    <div className="year">{event.year}</div>
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
    <div className="description">{event.description}</div>
  </div>
);

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
      <h3>&amp; more to come</h3>
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
      <div className="row" id="roadmap-elements">
        {events.map(event => (
          <Event key={event.year} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
