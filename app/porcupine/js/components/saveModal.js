import React from "react";
import Radium from "radium";

import LoginButton from "../../../giraffe/js/components/loginButton";
import { savePorkFile } from "../utils/savePorkFile";
import styles from "../styles/saveModal";

class SaveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commit_message: null,
      save_succes: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onClose() {
    const { onClose } = this.props;
    onClose();
  }

  onConfirm() {
    const { onClose } = this.props;
    const { nodes, links, user } = this.props;
    const { commit_message } = this.state;
    savePorkFile(nodes, links, user, commit_message).then(response => {
      console.log(response);
    });
    // onClose();
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
    const loggedIn = auth && auth.access_token;
    const yourRepo =
      auth &&
      auth.github_handle &&
      user &&
      user.user &&
      auth.github_handle.toLowerCase() == user.user.toLowerCase();
    // console.log(auth);

    return (
      <div className="modal-content">
        <h5 className="modal-title" id="exampleModalLabel">
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
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.onClose()}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Radium(SaveModal);
