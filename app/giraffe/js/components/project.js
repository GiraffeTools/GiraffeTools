import React, { Fragment } from "react";
import Radium from "radium";

import { initRepository } from "../utils/github";
import styles from "../styles/project.js";

const Project = repository => (
  <div
    className="d-flex"
    style={[
      styles.project,
      !repository.isGiraffeProject && styles.project.noGiraffe
    ]}
  >
    <div className="col-6 text-left">
      <div className="d-flex align-items-center">
        <h5 className="float-left" style={[styles.projectTitle]}>
          {repository.name}
        </h5>
        <div style={[styles.publicPrivate]}>
          {repository.private ? "Private" : "Public"}
        </div>
      </div>
      <img src="/static/img/separator_red.svg" />
      added{" "}
      {new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      }).format(new Date(repository.created_at))}
    </div>
    <div className="col-6 text-right">
      {repository.isGiraffeProject ? (
        <a
          type="button btn-primary"
          className="btn"
          href={`/github/${repository.full_name}`}
          style={[styles.open]}
        >
          open
        </a>
      ) : (
        <a
          type="button btn-primary"
          className="btn"
          id="no-giraffe-project"
          data-toggle="tooltip"
          data-placement="top"
          onClick={() =>
            initRepository(repository.owner.login, repository.name, "branch")
          }
          style={[styles.add]}
        >
          add
        </a>
      )}
    </div>
  </div>
);

export default Radium(Project);
