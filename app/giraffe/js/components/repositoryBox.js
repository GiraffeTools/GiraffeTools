import React, { Fragment } from "react";
import pluralize from "pluralize";

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

    fetch(`${apiBaseLink}/commits`)
      .then(response => response.json())
      .then(commits =>
        this.setState({
          numberOfCommits: commits.length
        })
      )
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
      <div className="col-3 text-center giraffe-box" id="project-box">
        <h3>About the project</h3>
        <img src="/static/img/separator_grey.svg" width="80%" />
        <br />
        <div className="text-left">
          <img src="/static/img/commits_icon.svg" />{" "}
          {`${numberOfCommits} ` + pluralize("commits", numberOfCommits)}
          <br />
          <img src="/static/img/branch_icon.svg" />{" "}
          {`${numberOfBranches} ` + pluralize("branches", numberOfBranches)}
          <br />
          <img src="/static/img/contributors_icon.svg" />{" "}
          {`${numberOfContributors} ` +
            pluralize("contributors", numberOfContributors)}
          <br />
          <img src="/static/img/release_icon.svg" />{" "}
          {`${numberOfReleases} ` + pluralize("releases", numberOfReleases)}
          <br />
        </div>

        <img src="/static/img/separator_grey.svg" width="80%" />
        <br />

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
    );
  }
}

export default RepositoryBox;
