import React from "react";

const People = () => (
  <div className="container-fluid text-center" id="people">
    <h2 className="with-lines">THE PEOPLE</h2>
    <div className="row justify-content-md-center" id="people">
      <div className="col col-lg-4 text-center">
        <img src="/static/img/tim_artsy_portrait.png" width="80%" />
      </div>
      <div className="col col-lg-4 text-left people-box">
        <h3>Dr. Tim van Mourik</h3>
        <br />
        <img src="/static/img/separator_red.svg" width="80%" />
        <br />
        And I automatically create the code for your analysis pipeline. Get
        started immediately by checking out the example files! It''s so super
        duper easy.
        <br />
        <a href="https://github.com/TimVanMourik" target="_blank">
          <img src="/static/img/github_icon.svg" />
        </a>
        <a
          href="https://nl.linkedin.com/in/tim-van-mourik-616249a1"
          target="_blank"
        >
          <img src="/static/img/linkedin_icon.svg" />
        </a>
        <a href="mailto:timvanmourik@gmail.com" target="_blank">
          <img src="/static/img/mail_icon.svg" />
        </a>
        <a href="https://www.timvanmourik.com" target="_blank">
          <img src="/static/img/web_icon.svg" />
        </a>
      </div>
    </div>
  </div>
);

export default People;
