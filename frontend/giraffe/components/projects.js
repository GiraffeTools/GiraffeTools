import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import Project from "../containers/project";
import { addTokenToQuery } from "../utils/auth";

import styles from "../styles/projects.js";
import { GITHUB_BASE_API } from "../config";

async function loadRepositories(
  username,
  page,
  setRepositories,
  setHasMore,
  setActiveProjects
) {
  const url = await addTokenToQuery(
    new URL(`${GITHUB_BASE_API}/users/${username}/repos?page=${page}`)
  );
  const repos = await fetch(url.href);
  const repoList = await repos.json();
  if (!repoList.length) {
    setHasMore(false);
    return;
  }

  const giraffeConfigFile = "GIRAFFE.yml";
  async function isGiraffeProject(repoName) {
    const url = await addTokenToQuery(
      new URL(
        `${GITHUB_BASE_API}/repos/${repoName}/contents/${giraffeConfigFile}`
      )
    );
    const file = await fetch(url);
    return file.ok;
  }
  const newList = repoList.map(async repo => {
    return {
      ...repo,
      isGiraffeProject: await isGiraffeProject(repo.full_name)
    };
  });
  const newRepos = await Promise.all(newList);
  setRepositories(oldRepos => {
    const repos = oldRepos.concat(newRepos);
    setActiveProjects(repos.filter(repo => repo.isGiraffeProject).length);
    return repos;
  });
}

const Projects = ({ username, setActiveProjects }) => {
  const [repositories, setRepositories] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const repositorySection = repositories.length ? (
    repositories.map(repository => (
      <Project key={repository.id} {...repository} />
    ))
  ) : (
    <div>This user does not have any GitHub projects.</div>
  );

  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  return (
    <div className="col-8 text-center">
      <div className="d-flex justify-content-center">
        <h4 style={styles.projects}>Projects</h4>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={page => {
          loadRepositories(
            username,
            page,
            setRepositories,
            setHasMore,
            setActiveProjects
          );
        }}
        hasMore={hasMore}
        loader={loader}
      >
        {repositorySection}
      </InfiniteScroll>
    </div>
  );
};

export default Projects;
