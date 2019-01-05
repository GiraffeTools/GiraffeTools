import React from "react";
import Radium from "radium";
import to from "await-to-js";

import LoginButton from "../../../giraffe/js/components/loginButton";
import { savePorkFile } from "../utils/savePorkFile";
import styles from "../styles/saveModal";

class SaveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commit_message: null,
      commit_pending: false,
      commit_succes: false,
      commit_error: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onClose() {
    const { onClose } = this.props;
    onClose();
  }

  async onConfirm() {
    const { onClose } = this.props;
    const { nodes, links, user } = this.props;
    const { commit_message } = this.state;
    this.setState({
      commit_pending: true,
      commit_succes: false,
      commit_error: false
    });
    const [error, response] = await to(
      savePorkFile(nodes, links, user, commit_message)
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
    const { user, auth } = this.props;
    const { commit_succes, commit_error, commit_pending } = this.state;
    const loggedIn = auth && auth.access_token;
    const yourRepo =
      auth &&
      auth.github_handle &&
      user &&
      user.user &&
      String(auth.github_handle).toLowerCase() == user.user.toLowerCase();
    // console.log(auth);

    return (
      <div className="modal-content">
        <h5 className="modal-title" style={[styles.title]}>
          Commit to GitHub
        </h5>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label className="col-form-label">GitHub Username:</label>
              <input
                type="text"
                className="form-control"
                name="github_user"
                disabled="True"
                value={user.user}
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Repository</label>
              <input
                type="text"
                className="form-control"
                name="github_repo"
                disabled="True"
                value={user.repository}
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Commit message</label>
              <input
                type="text"
                className="form-control"
                name="commit_message"
                onChange={this.handleInputChange}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <LoginButton user={auth} styles={[styles.loginButton]} />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.onConfirm()}
            disabled={!loggedIn || !yourRepo}
            data-toggle="tooltip"
            data-placement="top"
            title={
              (!loggedIn && "You're not logged in...") ||
              (!yourRepo && "This is not your repository...") ||
              "Push to GitHub!"
            }
          >
            {commit_pending ? "Committing..." : "Confirm"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.onClose()}
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

export default Radium(SaveModal);
