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

  async componentDidMount() {
    const { repository } = this.props;
    const apiBaseLink = `https://api.github.com/repos/${repository.full_name}`;

    const getCommits = async () => {
      const response = await fetch(`${apiBaseLink}/git/refs/heads/master`);
      const lastCommit = await response.json();
      const firstCommit = await repoFirstCommit({
        owner: repository.owner.login,
        repo: repository.name,
        sha: lastCommit.object.sha
      });
      const days_ago = await fetch(
        `${apiBaseLink}/compare/${lastCommit.object.sha}...${firstCommit.sha}`
      );
      const days_ago_json = await days_ago.json();
      this.setState({ numberOfCommits: days_ago_json.behind_by + 1 });
    };
    const getBranches = async () => {
      const branches = await (await fetch(`${apiBaseLink}/branches`)).json();
      this.setState({ numberOfBranches: branches.length });
    };
    const getContributors = async () => {
      const contributors = await (await fetch(
        `${apiBaseLink}/contributors`
      )).json();
      this.setState({ numberOfContributors: contributors.length });
    };
    const getReleases = async () => {
      const releases = await (await fetch(`${apiBaseLink}/releases`)).json();
      this.setState({ numberOfReleases: releases.length });
    };
    Promise.all([
      getCommits(),
      getBranches(),
      getContributors(),
      getReleases()
    ]);
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
      <div className="col-4 text-center">
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
