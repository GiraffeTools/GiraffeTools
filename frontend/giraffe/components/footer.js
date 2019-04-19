import React from "react";
import Radium from "radium";

import styles from "../styles/footer";

const Footer = () => (
  <div className="container-fluid row" style={[styles.footer]}>
    <div className="col" style={[styles.footerText]}>
      <b>&copy; 2018 Tim van Mourik</b>
      <br />
      Imprint | Privacy
      <br />
      Designed by Fuchsfabrik
      <br />
    </div>
    <img
      src="/static/img/giraffetools_logo_notext.png"
      style={[styles.footerLogo]}
    />
  </div>
);

export default Radium(Footer);
