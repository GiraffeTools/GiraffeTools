import React, { Fragment } from "react";
import Radium from "radium";

import Banner from "./banner";
import CommitBox from "./commitBox";
import Footer from "./footer";
import RepositoryBox from "./repositoryBox";
import styles from "../styles/repository.js";

class Repository extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null,
      branch: null,
      commit: null
    };
  }

  componentDidMount() {
    const { username, repository, branchOrCommit } = this.props.match.params;

    if (true) {
      this.setState({
        branch: "master"
      });
    } else {
      this.setState({
        commit: ""
      });
    }
    fetch(`https://api.github.com/repos/${username}/${repository}`)
      .then(response => response.json())
      .then(repository => this.setState({ repository }))
      .catch();
  }

  render() {
    const { repository, branch, commit } = this.state;
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
              <RepositoryBox repository={repository} />
              <div className="col-7">
                <div>
                  <h4 className="text-center" style={[styles.commitTitle]}>
                    {branch && (
                      <div>
                        Commits for Branch
                        <span
                          className="border-bottom"
                          style={[styles.branchText]}
                        >
                          {branch}
                        </span>
                      </div>
                    )}
                    {commit && (
                      <div>
                        Commits for Commit
                        <span
                          style={[styles.branchText]}
                          className="border-bottom"
                        >{` ${commit.substring(0, 6)} `}</span>{" "}
                        )
                      </div>
                    )}
                  </h4>
                  <CommitBox repository={repository} />
                </div>
              </div>
            </Fragment>
          )}
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Radium(Repository);
