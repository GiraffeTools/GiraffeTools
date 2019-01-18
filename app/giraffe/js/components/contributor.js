import React from "react";
import Radium from "radium";

import { shuffle } from "../utils/utils";
import styles from "../styles/contributor.js";

const Contributor = contributor => {
  return (
    <div
      className="col-4 justify-content-center d-flex"
      style={[styles.contributor]}
    >
      <div className="card" style={[styles.contributorCard]}>
        <img src={contributor.avatar_url} style={[styles.avatarImage]} />
        <div style={[styles.contributorTag]}>
          <a href={contributor.html_url} style={[styles.link]} target="_blank">
            {" "}
            <b style={[styles.username]}>@{contributor.login}</b>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Radium(Contributor);
