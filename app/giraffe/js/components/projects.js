import React, { Fragment } from "react";

const ProjectBox = repository => (
  <div
    className={
      "giraffe-box d-flex " + (repository.isGiraffeProject ? "" : "no-giraffe")
    }
  >
    <div className="col text-left">
      <div className="d-flex align-items-center">
        <h5 className="project-title float-left">{repository.name}</h5>
        <div className="public-private">
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
    <div className="col text-right">
      {repository.isGiraffeProject ? (
        <a
          type="button btn-primary"
          className="btn giraffe-button-small"
          href={`/github/${repository.full_name}`}
        >
          open
        </a>
      ) : (
        <a type="button btn-primary" className="btn" id="no-giraffe-project">
          add
        </a>
      )}
    </div>
  </div>
);

const Projects = ({ repositories }) => (
  <div className="col-8 text-center">
    <div className="d-flex justify-content-center">
      <h4 className="with-lines">Projects</h4>
    </div>
    {repositories ? (
      repositories
        .sort(function(a, b) {
          return b.isGiraffeProject - a.isGiraffeProject;
        })
        .map(repository => <ProjectBox key={repository.id} {...repository} />)
    ) : (
      <div>This user does not have any GitHub projects.</div>
    )}
  </div>
);

export default Projects;
