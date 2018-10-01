import React, { Fragment } from "react";
import pluralize from "pluralize";

const Commit = ({ commit }) => {
  const days_ago = Math.floor(
    (Date.now() - new Date(commit.commit.author.date)) / 1000 / 3600 / 24
  );
  return (
    <div className="row">
      <div className="col-6 text-left">
        <h5>{commit.commit.message}</h5>
        <b>@{commit.author.login}</b>
        {` committed ${days_ago} ` + pluralize("day", days_ago) + " ago"}
      </div>
      <div className="col-6 text-right">
        <a
          type="button btn-primary"
          className="btn"
          id="commit-hash-button"
          href={``}
        >
          {commit.sha.substring(0, 6)}
        </a>
        <a type="button btn-primary" className="btn giraffe-button" href={``}>
          open
        </a>
      </div>
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
    const branch = 'master';
    return (
      <div className="col-7 text-center">
        <div>
          <h4 className="with-lines">
            Commits for Branch <span id="branch-text">{branch}</span>{" "}
          </h4>
          {commits ? (
            commits.map(commit => <Commit key={commit.sha} commit={commit} />)
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default CommitBox;
