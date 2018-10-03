import React from "react";

const Contact = () => (
  <div id="contact" className="d-flex justify-content-begin position-relative">
    <div className="col-5 position-absolute text-center" id="join-us">
      <h4 className="with-lines">Want to join us?</h4>
    </div>
    <div className="icon-title-text" id="github-tag">
      <img className="icon-tile" src="/static/img/github_tag.png" />
      <span>@TimVanMourik</span>
    </div>
    <div className="icon-title-text" id="mail-tag">
      <span>Get in touch</span>
      <img className="icon-tile" src="/static/img/mail_tag.png" />
    </div>
  </div>
);

export default Contact;
