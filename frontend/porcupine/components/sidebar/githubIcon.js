import React from "react";
import Async from "react-async";

import styles from "../../styles/githubIcon";
import { addTokenToQuery } from "../../../giraffe/utils/auth";

async function loadGithubData({ user, repo }) {
  const url = await addTokenToQuery(
    new URL(`https://api.github.com/repos/${user}/${repo}`)
  );
  return fetch(url.href).then(response => response.json());
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const GithubIcon = ({ user, repo, type }) => {
  let link = null;
  let key = null;
  switch (type) {
    case "star":
      link = "stargazers";
      key = "stargazers_count";
      break;
    case "fork":
      link = "network";
      key = "forks_count";
      break;
  }
  return (
    <div className="large" style={styles.button}>
      <a
        href={`https://github.com/${user}/${repo}/${
          type == "fork" ? "fork" : ""
        }`}
        target="_blank"
        // className="btn"
        aria-label={`${type} ${user}/${repo} on GitHub`}
        style={styles.githubButton}
      >
        <img
          // className="octicon octicon-star"
          src={`/static/img/gh-${type}-icon.svg`}
          style={styles.octicon}
        />
        <span>{capitaliseFirstLetter(type)}</span>
      </a>
      <a
        href={`https://github.com/${user}/${repo}/${link}`}
        target="_blank"
        className="social-count"
        style={styles.socialCount}
      >
        <b style={styles.b} />
        <i style={styles.i} />
        <span>
          <Async promiseFn={loadGithubData} user={user} repo={repo}>
            <Async.Loading>-</Async.Loading>
            <Async.Fulfilled>{repository => repository[key]}</Async.Fulfilled>
            <Async.Rejected>"0"</Async.Rejected>
          </Async>
        </span>
      </a>
    </div>
  );
};

export default GithubIcon;
