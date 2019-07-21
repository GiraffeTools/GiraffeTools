import React from 'react';
import Radium from 'radium';
import to from 'await-to-js';

import LoginButton from '../../../giraffe/components/loginButton';
import GithubModalContent from './githubModalContent';
import {pushToGithub} from '../../utils/savePorkFile';
import styles from '../../styles/githubModal';

class GithubModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commitMessage: null,
      commitPending: false,
      commitSucces: false,
      commitError: false,
      githubRepo: null,
    };
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onClose() {
    const {onClose} = this.props;
    onClose();
  }

  async onConfirm() {
    const {githubAction, project, auth} = this.props;
    const {commitMessage, githubRepo} = this.state;
    this.setState({
      commitPending: true,
      commitSucces: false,
      commitError: false,
    });

    const {user, repository, porkFile} = project;
  debugger

    const commit = {
      ...project,
      message: commitMessage,
      repository: repository || githubRepo,
      user: user || (auth && auth.github_handle),
    };
    const content = {
      porkFile,
    };
    const [error, response] = await to(
        pushToGithub(commit, await githubAction(content))
    );
    if (!error && response.ok) {
      this.setState({
        commitPending: false,
        commitSucces: response.ok,
        commitError: false,
      });
    } else {
      this.setState({
        commitPending: false,
        commitSucces: false,
        commitError: true,
      });
    }
  }

  closeSucces() {
    this.setState({
      commitSucces: false,
    });
  }
  closeError() {
    this.setState({
      commitError: false,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {project, auth, title} = this.props;
    const {commitSucces, commitError, commitPending} = this.state;
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
              (!loggedIn && 'You\'re not logged in...') ||
              // (!yourRepo && "This is not your repository...") ||
              'Push to GitHub!'
            }
          >
            {commitPending ? 'Committing...' : 'Confirm'}
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
              'alert alert-success alert-dismissible fade' +
              (commitSucces ? ' show' : '')
            }
            onClick={() => this.closeSucces()}
            role="alert"
            style={[styles.alert, commitSucces && styles.alert.show]}
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
              'alert alert-danger alert-dismissible fade' +
              (commitError ? ' show' : '')
            }
            onClick={() => this.closeError()}
            role="alert"
            style={[styles.alert, commitError && styles.alert.show]}
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
