import React, { Fragment } from "react";
import pluralize from "pluralize";

const Commit = ({ commit, commitUrl }) => {
  const days_ago = Math.floor(
    (Date.now() - new Date(commit.commit.author.date)) / 1000 / 3600 / 24
  );
  return (
    <li className="commit-box row border-bottom">
      <div className="col-6 text-left">
        <h5>{commit.commit.message}</h5>
        <b>@{commit.commit.author.login}</b>
        {` committed ${days_ago} ` + pluralize("day", days_ago) + " ago"}
      </div>
      <div className="col-6 text-right">
        <a
          type="button btn-primary"
          className="btn"
          id="commit-hash-button"
          target="_blank"
          href={commit.html_url}
        >
          <img src="/static/img/gh-icon.png" className="gh-icon-small" />
          {commit.sha.substring(0, 6)}
        </a>
        <a
          type="button btn-primary"
          className="btn giraffe-button-small"
          href={``}
          data-toggle="tooltip"
          data-placement="top"
          title="Not implemented yet!"
        >
          open
        </a>
      </div>
    </li>
  );
};

export default Commit;
