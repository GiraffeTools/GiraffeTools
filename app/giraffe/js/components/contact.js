import React from "react";

const Contact = () => (
  <div id="contact" className="d-flex justify-content-begin">
    <div className="col-5">
      <h4 className="with-lines">Want to join us?</h4>
    </div>
    <div className="col-6">
      <div>
        <span className="icon-title-text">Get in touch</span>
        <img className="icon-tile" src="/static/img/mail_tag.png" />
      </div>
      <div>
        <img className="icon-tile" src="/static/img/github_tag.png" />
        <span className="icon-title-text">@TimVanMourik</span>
      </div>
    </div>
  </div>
);

export default Contact;
