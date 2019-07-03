import React from "react";
import Radium from "radium";
import to from "await-to-js";

import LoginButton from "../../../giraffe/components/loginButton";
import GithubModalContent from "./githubModalContent";
import { pushToGithub } from "../../utils/savePorkFile";
import styles from "../../styles/githubModal";

class GithubModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commit_message: null,
      commit_pending: false,
      commit_succes: false,
      commit_error: false,
      github_repo: null
    };
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onClose() {
    const { onClose } = this.props;
    onClose();
  }

  async onConfirm() {
    const { githubAction, project, auth } = this.props;
    const { commit_message, github_repo } = this.state;
    this.setState({
      commit_pending: true,
      commit_succes: false,
      commit_error: false
    });

    const { user, repository, pork_file } = project;
    const commit = {
      ...project,
      commit_message,
      repository: repository || github_repo,
      user: user || (auth && auth.github_handle)
    };
    const content = {
      pork_file
    };
    const [error, response] = await to(
      pushToGithub(commit, await githubAction(content))
    );
    if (!error && response.ok) {
      this.setState({
        commit_pending: false,
        commit_succes: response.ok,
        commit_error: false
      });
    } else {
      this.setState({
        commit_pending: false,
        commit_succes: false,
        commit_error: true
      });
    }
  }

  closeSucces() {
    this.setState({
      commit_succes: false
    });
  }
  closeError() {
    this.setState({
      commit_error: false
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { project, auth, title } = this.props;
    const { commit_succes, commit_error, commit_pending } = this.state;
    const loggedIn = auth && auth.access_token;
    const yourRepo =
      auth &&
      auth.github_handle &&
      project &&
      project.user &&
      String(auth.github_handle).toLowerCase() == project.user.toLowerCase();

    return (
      <div className="modal-content">
        <h5 className="modal-title" style={[styles.title]}>
          {title}
        </h5>
        <GithubModalContent
          repository={project && project.repository}
          user={(project && project.user) || (auth && auth.github_handle)}
          onChange={this.handleInputChange}
        />
        <div className="modal-footer">
          <LoginButton user={auth} styles={[styles.loginButton]} />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.onConfirm()}
            // disabled={!loggedIn}
            // disabled={!loggedIn || !yourRepo}
            data-toggle="tooltip"
            data-placement="top"
            title={
              (!loggedIn && "You're not logged in...") ||
              // (!yourRepo && "This is not your repository...") ||
              "Push to GitHub!"
            }
          >
            {commit_pending ? "Committing..." : "Confirm"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onClose}
          >
            Close
          </button>
        </div>
        <div className="d-flex justify-content-center" style={[styles.alerts]}>
          <div
            className={
              "alert alert-success alert-dismissible fade" +
              (commit_succes ? " show" : "")
            }
            onClick={() => this.closeSucces()}
            role="alert"
            style={[styles.alert, commit_succes && styles.alert.show]}
          >
            Commited!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className={
              "alert alert-danger alert-dismissible fade" +
              (commit_error ? " show" : "")
            }
            onClick={() => this.closeError()}
            role="alert"
            style={[styles.alert, commit_error && styles.alert.show]}
          >
            Sorry, something went wrong there...
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(GithubModal);
