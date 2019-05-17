import React from "react";
import Radium, { StyleRoot } from "radium";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { v4 } from "uuid";

import GithubIcon from "./githubIcon";
import ToolboxGroup from "./toolboxGroup";
import SearchBar from "../../containers/searchBar";
import styles from "../../styles/sidebar";
import { savePorkFile } from "../../utils/savePorkFile";
import { API_HOST } from "../../../giraffe/config";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedNodes: null,
      searchText: ""
    };
  }

  async componentDidMount() {
    const { addToolboxNodes } = this.props;
    const nodes = await (await fetch(`${API_HOST}/nodes`)).json();
    addToolboxNodes(nodes.toolboxes);
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  render() {
    const {
      showSidebar,
      project,
      openModal,
      toggleToolbox,
      showToolboxes,
      searchText
    } = this.props;
    const { matchedNodes, searching } = this.state;
    const { nodes, links, allNodes } = this.props;
    const currentNodes =
      searchText && searchText.length ? matchedNodes : allNodes;
    return (
      <div style={[styles.sidebar, showSidebar && styles.sidebar.active]}>
        <div style={[styles.logoSidebar]}>
          <a href="/">
            <img
              style={[styles.logo]}
              src={"/static/img/giraffetools_logo_notext.png"}
              className="img-responsive"
              alt="logo"
            />
          </a>
        </div>
        <div style={[styles.search]}>
          <h5 style={[styles.sidebarHeading]}>SEARCH</h5>
          <SearchBar
            toolboxes={allNodes}
            setSearchResults={results =>
              this.setState({ matchedNodes: results })
            }
          />
        </div>
        <div style={[styles.nodes]}>
          <h5 style={[styles.sidebarHeading]}>NODES</h5>
        </div>
        <div style={[styles.nodeBox]} className="customScrollbar">
          <div
            style={[styles.panelGroup]}
            role="tablist"
            aria-multiselectable="true"
          >
            {currentNodes &&
              currentNodes.map(toolbox => (
                <ToolboxGroup
                  key={toolbox.name}
                  show={showToolboxes && showToolboxes.includes(toolbox.name)}
                  toolbox={toolbox}
                  toggleToolbox={toggleToolbox}
                />
              ))}
          </div>
        </div>
        <div style={[styles.actionsPanel]}>
          <h5 style={[styles.sidebarHeading]}>ACTIONS</h5>
          {project.user &&
            project.repository && (
              <div style={[styles.buttons]}>
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
                style={[styles.panelText]}
                className="btn btn-block"
                href={`https://github.com/${project.user}/${
                  project.repository
                }`}
                target="_blank"
              >
                <img style={[styles.panelIcon]} src="/static/img/gh-icon.png" />
                Check out on GitHub
              </a>
            )}
          {
            <a
              style={[styles.panelText]}
              className="btn btn-block text-left"
              onClick={() =>
                openModal({
                  id: v4(),
                  title: "Commit to GitHub",
                  type: "push_to_github",
                  project,
                  onClose: () => {},
                  onConfirm: () => savePorkFile(nodes, links, project)
                })
              }
            >
              <i style={[styles.panelIcon]} className="fas fa-save" />
              Save to GitHub
            </a>
          }
        </div>
      </div>
    );
  }
}

export default Radium(Sidebar);
