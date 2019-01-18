import React, { Fragment } from "react";
import Radium from "radium";

import Project from "../containers/project";
import styles from "../styles/projects.js";

const Projects = ({ repositories }) => (
  <div className="col-8 text-center">
    <div className="d-flex justify-content-center">
      <h4 style={[styles.projects]}>Projects</h4>
    </div>
    {repositories ? (
      repositories
        .sort(function(a, b) {
          return b.isGiraffeProject - a.isGiraffeProject;
        })
        .map(repository => <Project key={repository.id} {...repository} />)
    ) : (
      <div>This user does not have any GitHub projects.</div>
    )}
  </div>
);

export default Radium(Projects);
