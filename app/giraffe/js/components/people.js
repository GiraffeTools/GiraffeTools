import React from "react";

const People = () => (
  <div className="container-fluid text-center" id="people">
    <div id="slant-separator">
      <svg width="100%">
        <svg width="120%">
          <g transform="rotate(-3)">
            <rect x="-5%" y="0%" width="100%" height="100%" fill="white" />
          </g>
        </svg>
      </svg>
    </div>
    <h2 className="with-lines">THE PEOPLE</h2>
    <div className="d-flex justify-content-md-center" id="people-box">
      <div className="col col-lg-4 text-center">
        <img src="/static/img/tim_artsy_portrait.png" width="80%" />
      </div>
      <div className="col col-lg-4 text-left position-relative" id="tool-text">
        <h3 className="people-title">Dr. Tim van Mourik</h3>
        <br />
        <img src="/static/img/separator_red.svg" width="80%" />
        <br />
        And I automatically create the code for your analysis pipeline. Get
        started immediately by checking out the example files! It''s so super
        duper easy.
        <br />
        <a href="https://github.com/TimVanMourik" target="_blank">
          <img src="/static/img/github_icon.svg" className="icon" />
        </a>
        <a
          href="https://nl.linkedin.com/in/tim-van-mourik-616249a1"
          target="_blank"
          className="icon"
        >
          <img src="/static/img/linkedin_icon.svg" className="icon" />
        </a>
        <a
          href="mailto:timvanmourik@gmail.com"
          target="_blank"
          className="icon"
        >
          <img src="/static/img/mail_icon.svg" className="icon" />
        </a>
        <a href="https://www.timvanmourik.com" target="_blank" className="icon">
          <img src="/static/img/web_icon.svg" className="icon" />
        </a>
      </div>
    </div>
  </div>
);

export default People;
