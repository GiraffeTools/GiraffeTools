import React, { Fragment } from "react";
import { StyleRoot } from "radium";
import pluralize from "pluralize";

import styles from "../styles/commit";

const Commit = ({ commit, full_name }) => {
  const days_ago = Math.floor(
    (Date.now() - new Date(commit.commit.author.date)) / 1000 / 3600 / 24
  );
  const maxLength = 28;
  const message =
    commit.commit.message.length < maxLength
      ? commit.commit.message
      : commit.commit.message.substring(0, maxLength - 3) + "...";

  return (
    <StyleRoot>
      <li className="row border-bottom" style={[styles.commitBox]}>
        <div className="col-6 text-left">
          <h5>{message}</h5>
          <b>@{commit.commit.author.login}</b>
          {` committed ${days_ago} ` + pluralize("day", days_ago) + " ago"}
        </div>
        <div className="col-6 text-right">
          <a
            style={[styles.commitHashButton]}
            type="button btn-primary"
            className="btn"
            target="_blank"
            href={commit.html_url}
          >
            <img src="/static/img/gh-icon.png" style={[styles.githubButton]} />
            {commit.sha.substring(0, 6)}
          </a>
          <a
            type="button btn-primary"
            style={[styles.openButton]}
            className="btn"
            href={`/porcupine/${full_name}/${commit.sha}`}
            data-toggle="tooltip"
            data-placement="top"
          >
            open
          </a>
        </div>
      </li>
    </StyleRoot>
  );
};

export default Commit;
