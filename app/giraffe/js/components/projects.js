import React, { Fragment } from "react";
import Radium from "radium";
import InfiniteScroll from "react-infinite-scroller";

import Project from "../containers/project";
import styles from "../styles/projects.js";

const Projects = ({ repositories, hasMore, loadMore }) => {
  const repositorySection = repositories.length ? (
    repositories.map(repository => (
      <Project key={repository.id} {...repository} />
    ))
  ) : (
    // (repositories.sort(function(a, b) {return b.isGiraffeProject - a.isGiraffeProject;})
    <div>This user does not have any GitHub projects.</div>
  );

  return (
    <div className="col-8 text-center">
      <div className="d-flex justify-content-center">
        <h4 style={[styles.projects]}>Projects</h4>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {repositorySection}
      </InfiniteScroll>
    </div>
  );
};

export default Radium(Projects);
