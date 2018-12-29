import React, { Fragment } from "react";
import Radium from "radium";
import pluralize from "pluralize";
import repoFirstCommit from "repo-first-commit";

import styles from "../styles/repositoryBox.js";

class RepositoryBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfCommits: null,
      numberOfBranches: null,
      numberOfContributors: null,
      numberOfReleases: null
    };
  }

  componentDidMount() {
    const { repository } = this.props;
    const apiBaseLink = `https://api.github.com/repos/${repository.full_name}`;

    fetch(`${apiBaseLink}/git/refs/heads/master`)
      .then(response => response.json())
      .then(lastCommit => {
        repoFirstCommit({
          owner: repository.owner.login,
          repo: repository.name,
          sha: lastCommit.object.sha
        }).then(firstCommit => {
          fetch(
            `${apiBaseLink}/compare/${lastCommit.object.sha}...${
              firstCommit.sha
            }`
          )
            .then(response => response.json())
            .then(diff =>
              this.setState({
                numberOfCommits: diff.behind_by + 1
              })
            );
        });
      })
      .catch();
    fetch(`${apiBaseLink}/branches`)
      .then(response => response.json())
      .then(branches =>
        this.setState({
          numberOfBranches: branches.length
        })
      )
      .catch();
    fetch(`${apiBaseLink}/contributors`)
      .then(response => response.json())
      .then(contributors =>
        this.setState({
          numberOfContributors: contributors.length
        })
      )
      .catch();
    fetch(`${apiBaseLink}/releases`)
      .then(response => response.json())
      .then(releases =>
        this.setState({
          numberOfReleases: releases.length
        })
      )
      .catch();
  }

  render() {
    const {
      numberOfCommits,
      numberOfBranches,
      numberOfContributors,
      numberOfReleases
    } = this.state;
    const { repository } = this.props;

    return (
      <div className="col-3 text-center">
        <div className="sticky-top">
          <div style={[styles.whitespace]} />
          <div style={[styles.projectBox]}>
            <h4 style={[styles.about]}>About the project</h4>
            <div style={[styles.repoBoxContent]}>
              <img
                src="/static/img/separator_grey.svg"
                style={[styles.separator]}
              />
              <p className="text-left">
                <img
                  src="/static/img/commits_icon.svg"
                  style={[styles.projectIcon]}
                />{" "}
                {`${numberOfCommits} ` + pluralize("commits", numberOfCommits)}
                <br />
                <img
                  src="/static/img/branch_icon.svg"
                  style={[styles.projectIcon]}
                />{" "}
                {`${numberOfBranches} ` +
                  pluralize("branches", numberOfBranches)}
                <br />
                <img
                  src="/static/img/contributors_icon.svg"
                  style={[styles.projectIcon]}
                />{" "}
                {`${numberOfContributors} ` +
                  pluralize("contributors", numberOfContributors)}
                <br />
                <img
                  src="/static/img/release_icon.svg"
                  style={[styles.projectIcon]}
                />{" "}
                {`${numberOfReleases} ` +
                  pluralize("releases", numberOfReleases)}
              </p>

              <img
                src="/static/img/separator_grey.svg"
                style={[styles.separator]}
              />
            </div>
            <p>
              owned by{" "}
              <a href="./" style={[styles.giraffeLink]}>
                <b>{repository.owner.login}</b>
              </a>
              {" added on "}
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(new Date(repository.created_at))}
            </p>
            <a
              type="button btn-primary"
              className="btn"
              href={`/porcupine/${repository.full_name}`}
              style={[styles.open]}
            >
              Open project
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(RepositoryBox);
