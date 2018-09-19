import React, { Fragment } from "react";
import pluralize from "pluralize";

import Banner from "./banner";
import CommitBox from "./commitBox";
import Footer from "./footer";
import RepositoryBox from "./repositoryBox";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null
    };
  }

  componentDidMount() {
    const { username, repository } = this.props.match.params;

    fetch(`https://api.github.com/repos/${username}/${repository}`)
      .then(response => response.json())
      .then(repository => this.setState({ repository }))
      .catch();
  }

  render() {
    const { repository } = this.state;
    const bannerTitle =
      repository && repository.name
        ? `${repository.name}`
        : "Repository not found";

    return (
      <Fragment>
        <Banner title={`${bannerTitle}`} />
        {repository ? (
          <div className="row">
            <div className="col-1" />
            <RepositoryBox repository={repository} />
            <div className="col-1" />
          </div>
        ) : (
          <div />
        )}
        <Footer />
      </Fragment>
    );
  }
}

export default Project;
