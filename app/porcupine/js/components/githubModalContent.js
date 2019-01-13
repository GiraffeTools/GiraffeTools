import React from "react";

const GithubModalContent = ({ project, onChange }) => (
  <div className="modal-body">
    <form>
      <div className="form-group">
        <label className="col-form-label">GitHub Username:</label>
        <input
          type="text"
          className="form-control"
          name="github_user"
          disabled="True"
          value={project.user}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Repository</label>
        <input
          type="text"
          className="form-control"
          name="github_repo"
          disabled="True"
          value={project.repository}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Commit message</label>
        <input
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
