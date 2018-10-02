import React, { Fragment } from "react";
import pluralize from "pluralize";

import { groupByDate } from "../utils/utils";

const Commit = ({ commit }) => {
  const days_ago = Math.floor(
    (Date.now() - new Date(commit.author.date)) / 1000 / 3600 / 24
  );
  return (
    <li className="commit-box row border-bottom">
      <div className="col-6 text-left">
        <h5>{commit.message}</h5>
        <b>@{commit.author.login}</b>
        {` committed ${days_ago} ` + pluralize("day", days_ago) + " ago"}
      </div>
      <div className="col-6 text-right">
        <a
          type="button btn-primary"
          className="btn"
          id="commit-hash-button"
          href={`${commit.tree.url}`}
        >
          <img src="/static/img/gh-icon.png" className="gh-icon-small" />
          {commit.tree.sha.substring(0, 6)}
        </a>
        <a type="button btn-primary" className="btn giraffe-button" href={``}>
          open
        </a>
      </div>
    </li>
  );
};

const Commits = ({ commits }) => {
  const groupedCommits = groupByDate(commits);
  const dates = Object.keys(groupedCommits).sort(function(a, b) {
    a = new Date(a);
    b = new Date(b);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  return (
    <div>
      {dates.map(date => {
        const days_ago = (Date.now() - new Date(date)) / 1000 / 3600 / 24;

        return (
          <div key={`${date}`}>
            <h6>
              {days_ago < 1 ? "Today" : days_ago < 2 ? "Yesterday" : `${date}`}
            </h6>
            <ul className="commit-day border">
              {groupedCommits[date].map(({ commit }) => (
                <Commit key={commit.tree.sha} commit={commit} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

class CommitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: null
    };
  }

  componentDidMount() {
    const { full_name } = this.props.repository;

    fetch(`https://api.github.com/repos/${full_name}/commits`)
      .then(response => response.json())
      .then(commits => this.setState({ commits }))
      .catch();
  }

  render() {
    const { commits } = this.state;
    const branch = "master";
    return (
      <div className="col-7">
        <div>
          <h4 className="with-lines">
            Commits for Branch <span id="branch-text">{branch}</span>{" "}
          </h4>
          {commits && <Commits commits={commits} />}
        </div>
      </div>
    );
  }
}

export default CommitBox;
