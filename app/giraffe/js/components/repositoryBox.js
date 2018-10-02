import React, { Fragment } from "react";
import pluralize from "pluralize";
import repoFirstCommit from "repo-first-commit";

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
      <div className="col-4 text-center">
        <div className="giraffe-box" id="project-box">
          <h4>About the project</h4>
          <div id="repo-box-content">
            <img
              src="/static/img/separator_grey.svg"
              className="separator-grey"
            />
            <br />
            <div className="text-left">
              <img
                src="/static/img/commits_icon.svg"
                className="project-icon"
              />{" "}
              {`${numberOfCommits} ` + pluralize("commits", numberOfCommits)}
              <br />
              <img
                src="/static/img/branch_icon.svg"
                className="project-icon"
              />{" "}
              {`${numberOfBranches} ` + pluralize("branches", numberOfBranches)}
              <br />
              <img
                src="/static/img/contributors_icon.svg"
                className="project-icon"
              />{" "}
              {`${numberOfContributors} ` +
                pluralize("contributors", numberOfContributors)}
              <br />
              <img
                src="/static/img/release_icon.svg"
                className="project-icon"
              />{" "}
              {`${numberOfReleases} ` + pluralize("releases", numberOfReleases)}
              <br />
            </div>

            <img
              src="/static/img/separator_grey.svg"
              className="separator-grey"
            />
            <br />
          </div>

          {`owned by ${repository.owner.login}`}
          <br />
          {"added on "}
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(new Date(repository.created_at))}

          <br />
          <a
            type="button btn-primary"
            className="btn giraffe-button"
            href={`/porcupine/${repository.full_name}`}
          >
            Open project
          </a>
        </div>
      </div>
    );
  }
}

export default RepositoryBox;
