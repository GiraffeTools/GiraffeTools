import React, { Fragment } from "react";

class CommitBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-7 text-center">
        <div>
          <h3 id="your-project-tag">
            Commits for Branch <span>master</span>{" "}
          </h3>
        </div>
      </div>
    );
  }
}
