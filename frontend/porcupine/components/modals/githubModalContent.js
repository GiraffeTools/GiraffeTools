import React from "react";

require("../../scss/modals.scss");

const GithubModalContent = ({ repository, user, onChange }) => (
  <div className="modal-body">
    <form>
      <div className="form-group">
        <label className="col-form-label">GitHub Username:</label>
        <input
          type="text"
          className="form-control"
          name="github_user"
          disabled="True"
          value={user}
          placeholder={"Please log in to save"}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Repository</label>
        <input
          type="text"
          className="form-control"
          name="github_repo"
          onChange={onChange}
          disabled={repository ? "True" : ""}
          defaultValue={repository ? repository : ""}
          placeholder="New repository name"
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Commit message</label>
        <input
          placeholder="Summary required"
          type="text"
          className="form-control"
          name="commit_message"
          onChange={onChange}
        />
      </div>
    </form>
  </div>
);

export default GithubModalContent;
