import React, {Fragment, useRef, useState, useEffect} from 'react';

import GithubIcon from './githubIcon';
import ToolboxGroup from './toolboxGroup';
import SearchBar from './searchBar';
import styles from '../../styles/sidebar';
import {savePorkFile, initPorkFile} from '../../utils/savePorkFile';

import '../../scss/sidebar.scss';
import '../../scss/scrollbar.scss';
import '../../scss/hamburger.scss';

function mount(addToolboxNodes) {
  const nodes = [
    '/static/Libraries/nipype/nipype_nodes.json',
    // "/static/Libraries/keras/keras_nodes.json"
  ];
  const toolboxes = nodes.map(async (url) => await (await fetch(url)).json());
  Promise.all(
      toolboxes.map(async (nodes) =>
        addToolboxNodes((await nodes)['toolboxes'])
      )
  );
  return;
}

const Sidebar = (props) => {
  const {
    allNodes,
    project,
    openModal,
    showToolboxes,
    addToolboxNodes,
  } = props;

  useEffect(() => mount(addToolboxNodes), []);

  const [showSidebar, toggleSidebar] = useState(false);
  const searchBar = useRef(null);
  const [matchedNodes, setMatches] = useState();

  const searching =
    searchBar.current &&
    searchBar.current.state.searchText &&
    searchBar.current.state.searchText.length;
  const currentNodes = searching ? matchedNodes : allNodes;

  let projectPageUrl = '/github/';
  if (project && project.user) {
    const {user, repository, branch, commit} = project;
    projectPageUrl += user + '/';
    projectPageUrl += repository ? (repository + '/') : '';
    projectPageUrl += (branch || commit) ? (branch || commit) : '';
  }
  return (
    <Fragment>
      <div
        id="burger"
        className={'sidebarButton ' + (showSidebar ? 'open' : '')}
        onClick={() => toggleSidebar(!showSidebar)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={'sidebar ' + (showSidebar ? 'active' : 'inactive')}
      >
        <div style={styles.logoSidebar}>
          <a href={projectPageUrl}>
            <img
              style={styles.logo}
              src={'/static/img/giraffetools_logo_notext.png'}
              className="img-responsive"
              alt="logo"
            />
          </a>
        </div>
        <div style={styles.search}>
          <h5 style={styles.sidebarHeading}>SEARCH</h5>
          <SearchBar
            ref={searchBar}
            toolboxes={allNodes}
            setSearchResults={(results) => setMatches(results)}
          />
        </div>
        <div style={styles.nodes}>
          <h5 style={styles.sidebarHeading}>
            TOOLBOXES
            <a
              onClick={() =>
                openModal({
                  title: 'Toolboxes',
                  type: 'toggle_toolboxes',
                  onClose: () => {},
                  onConfirm: () => {},
                })
              }
            >
              <img style={styles.gear} src="/static/img/gear.svg" />
            </a>
          </h5>
        </div>
        <div style={styles.nodeBox} className="customScrollbar">
          <div
            style={styles.panelGroup}
            role="tablist"
            aria-multiselectable="true"
          >
            {currentNodes &&
              currentNodes.map((toolbox, index) => {
                if (!showToolboxes || !showToolboxes.includes(toolbox.name)) {
                  return null;
                }
                return <ToolboxGroup key={index} toolbox={toolbox} />;
              })}
          </div>
        </div>
        <div style={styles.actionsPanel}>
          <h5 style={styles.sidebarHeading}>ACTIONS</h5>
          {project.user &&
            project.repository && (
            <div style={styles.buttons}>
              <GithubIcon
                type="fork"
                user={project.user}
                repo={project.repository}
              />
              <GithubIcon
                type="star"
                user={project.user}
                repo={project.repository}
              />
            </div>
          )}
          {project &&
            project.user && (
            <a
              style={styles.panelText}
              className="btn btn-block"
              href={`https://github.com/${project.user}/${
                project.repository
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img style={styles.panelIcon} src="/static/img/gh-icon.png" />
                Check out on GitHub
            </a>
          )}
          {
            <a
              style={styles.panelText}
              className="btn btn-block text-left"
              onClick={() =>
                openModal({
                  title: 'Commit to GitHub',
                  type: 'push_to_github',
                  project,
                  onClose: () => {},
                  onConfirm:
                    project.user && project.repository
                      ? (content) => savePorkFile(content)
                      : (content) => initPorkFile(content),
                })
              }
            >
              <i style={styles.panelIcon} className="fas fa-save" />
              Save to GitHub
            </a>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
