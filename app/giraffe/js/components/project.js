import React, { Fragment } from "react";

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
        <div className="d-flex justify-content-center">
          {repository && (
            <Fragment>
              <div className="col col-1" />
              <RepositoryBox repository={repository} />
              <CommitBox repository={repository} />
            </Fragment>
          )}
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Project;
