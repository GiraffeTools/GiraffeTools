import React from "react";

import { savePorkFile } from "../utils/savePorkFile";

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
    const { user } = this.props;

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
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.onConfirm()}
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

export default SaveModal;
